﻿
import specimenData from './Specimens.vue.data.js';

import CivicGeneSelectionPlugin from '../plugins/externaldata/CivicGeneSelection.vue';

import Multiselect from 'vue-multiselect';
import axios from 'axios';
//import debounce from 'lodash/debounce';
import cloneDeep from 'lodash/cloneDeep'

import customDataHelpersMixin from '../../mixins/customDataHelpers.js';

const uuidV1 = require('uuid/v1');

require('array-remove-if');

module.exports =
{
    name: "Specimens",
    components: {
        Multiselect,
        CivicGeneSelectionPlugin
    },
    mixins: [
        customDataHelpersMixin
    ],
    props: {
        value: Array,
        organization: Object,
        barcodes: Array
    },
    data: function ()
    {
        return {
            specimensState: specimenData.specimensState,
            civicGenesCache: [],
        };
    },
    watch: {
        'specimensState.specimens': {
            handler: function(){
                //trying not to break vue's unidirectional data flow, and support v-model by convention
                //note that specimensState.specimens = value property in created method
                var vm = this;
                vm.$emit('input', vm.specimensState.specimens);
            },
            deep: true
        },
        'barcodes': function(val){
            var vm = this;
            val.forEach(function(bc)
            {
                if(typeof bc.customData.specimenGuids === 'undefined')
                    return;
                vm.specimensState.specimens.forEach(function(s){
                    if(bc.customData.specimenGuids.indexOf(s.guid) > -1)
                        vm.$set(s,'barcodeNumber', bc.number);
                });                
            });            
        }
    },
    computed:
        { 
            currentSpecimen:{
                get: function(){
                    var vm = this;
                    var spec = null;
                    if(vm.specimensState.editingSpecimenGuid === '' || vm.specimensState.editingSpecimenGuid === null)
                        return spec;
                    spec = vm.specimensState.specimens.find(function(s){
                        return s.guid === vm.specimensState.editingSpecimenGuid;
                    });
                    return spec;
                },
                set: function(value)
                {
                    var vm = this;
                    var index = vm.specimensState.specimens.findIndex(function(s){
                        return s.guid = value.guid;
                    });
                    vm.specimensState.specimens.$set(index, value);
                }
            },
            currentSpecimenCollectionDate:{
                get: function(){
                    var vm = this;
                    var retVal = null;
                    if(vm.currentSpecimen !== null){
                        return vm.$options.filters.localeDate(vm.currentSpecimen.collectionDate)
                    }
                    return retVal;
                },
                set: function(value)
                {
                    var vm = this;
                    vm.$set(vm.currentSpecimen, 'collectionData', new Date(value).toJSON());
                }
            },
            currentGroupQuantity:{
                get: function(){
                    var vm = this;
                    if(typeof vm.currentSpecimen === 'undefined')
                        return 1;
                    return vm.groupQuantity(vm.currentSpecimen);
                },
                set: function(value){
                    var vm = this;
                    var currentQty = vm.groupQuantity(vm.currentSpecimen);
                    
                    if(typeof vm.currentSpecimen === 'undefined')
                        return;            
                    if(typeof vm.currentSpecimen.customData === 'undefined')
                        return;
                    if(typeof vm.currentSpecimen.customData.groupGuid === 'undefined')
                        vm.$set(vm.currentSpecimen.customData, 'groupGuid', uuidV1());

                    if(currentQty < value) //semi-redundant, but for clarity
                    {
                        while(currentQty < value)
                        {
                            vm.copySpecimen(vm.currentSpecimen);
                            currentQty++;
                        }
                    }
                    else if(currentQty > value)
                    {
                        //get the currentspecimens index as a placeholder
                        var placeholderIndex = vm.specimensState.specimens.indexOf(vm.currentSpecimen);
                        //remove the entire group from specimens
                        var groupRemoved = vm.specimensState.specimens.removeIf(function(s){
                            if(typeof s.customData.groupGuid === 'undefined')
                                return false;
                            s.customData.groupGuid === vm.currentSpecimen.groupGuid
                        });
                        //truncate the group
                        groupRemoved.length = value;
                        //re-insert the group
                        groupRemoved.reverse().forEach(s=>vm.specimensState.specimens.splice(placeholderIndex,0,s));
                    }
                }
            },
        },
    beforeMount: function() {

    },
    created: function(){
        var vm = this;
        vm.$set(vm.specimensState, 'specimens', vm.value);
        vm.specimensState.specimens.forEach(function(specimen) {
            if(specimen.guid === '00000000-0000-0000-0000-000000000000') //bad persisted data issue
                specimen.guid = uuidV1();
            if(vm.isGroupLeader(specimen) && (typeof specimen.customData.groupGuid === 'undefined' || specimen.customData.groupGuid === '00000000-0000-0000-0000-000000000000'))
                vm.$set(specimen.customData, 'groupGuid', uuidV1());
        });
    },
    mounted: function(){
        this.toolTips();
    },   

    methods:{

        //not working!
        toolTips: function() {this.$nextTick(function(){$('[data-toggle="tooltip"]').tooltip();});},

        //component event - supposedly not supposed to modify properties but this seems to work
        //changed: function() {this.$emit('changed', this.specimens);},

        //have to consider using a plugin vuex store or similar so a plugin can access global data
        cacheCivicGenes: function(genes) {
            var vm = this;
            vm.$set(vm, 'civicGenesCache', genes);
        },

        currentSpecimenTypeTransportChanged: function(){
            var spec = this.currentSpecimen;
            var type = this.organizationSpecimenTypes.find(function(t){return t.code === spec.type.code;});
            var transport = this.getSpecimenTransports(type.code).find(function(t){return t.code === spec.transport.code;});
            if(transport === null)
                spec.code = type.code;
            else
                spec.code = type.code + '-' + transport.code;
        },

        showSpecimen:function(specimen)
        {
            var vm = this;
            if(typeof specimen.customData.groupGuid === 'undefined')
                return true;
            if(vm.specimensState.expandCurrentGroup && specimen.customData.groupGuid === currentSpecimen.customData.groupGuid)
                return true;
            return vm.isGroupLeader(specimen);
        },

        isGroupLeader: function(specimen){
            var vm = this;
            var groupIndex = vm.specimensState.specimens.findIndex(function(s)
            {
                return s.customData.groupGuid === specimen.customData.groupGuid;
            });
            return vm.specimensState.specimens.indexOf(specimen) === groupIndex;
        },

        groupQuantity: function(specimen){
            var vm = this;
            var count = 0;

            if(typeof specimen.customData.groupGuid === 'undefined')
                return 1;                 
                    
            for(var i = 0; i < vm.specimensState.specimens.length; ++i){
                if(vm.specimensState.specimens[i].customData.groupGuid == specimen.customData.groupGuid)
                    count++;
            }
            return count;
        },

        copySpecimen: function(specimen){
            var vm = this;
            var newSpecimen = cloneDeep(specimen);
            newSpecimen.id = -1;
            newSpecimen.guid = uuidV1();
            vm.specimensState.specimens.push(newSpecimen);
        },

        addSpecimen: function(type){
            var vm = this;

            var newSpec = {
                guid: uuidV1(),
                id: -1,
                parentSpecimenGuid: '00000000-0000-0000-0000-000000000000',
                type: {type: type.type, code: type.code},
                code: type.code, //temp
                transport: {name: null, code: null},
                externalId: null,
                customData: {
                    groupGuid: uuidV1(),
                },
                collectionDate: new Date((new Date()-1)).toJSON(),
                receivedDate: new Date().toJSON(),
                category: null
                //attributesAreSet: false
            }

            vm.setSpecimenAttributes(newSpec);

            vm.specimensState.specimens.push(newSpec);

            vm.$set(vm.specimensState, 'editingSpecimenGuid', newSpec.guid);

            vm.$nextTick(function() {
                vm.setExpandedSpecimen(true);
            });
        },

        specimenClicked: function(specimen){
            var expand = false;
            var vm = this;
            if(specimen.guid === vm.specimensState.editingSpecimenGuid){
                vm.$set(vm.specimensState, 'editingSpecimenGuid', '');
            }
            else{
                vm.$set(vm.specimensState, 'editingSpecimenGuid', specimen.guid);
                vm.setSpecimenAttributes(specimen);
                expand = true;
            }
            vm.$nextTick(function() {
                vm.setExpandedSpecimen(expand);}
            );
        },

        setExpandedSpecimen: function(expandCurrent){
            var vm = this;
            vm.specimensState.specimens.forEach(function(s){
                var specCollapse = $('#collapse'+s.guid);
                var isShown = specCollapse._isShown;
                if(s == vm.currentSpecimen && expandCurrent && !isShown)
                    specCollapse.collapse('show');
                else if(isShown)
                    specCollapse.collapse('hide');
            });

            //do this while we're here
            //see moment.js string-format for locale
            $('.dateTimePicker').daterangepicker({
                "singleDatePicker": true,
                "timePicker": true,
                "timePicker24Hour": false,
                "locale": {
                    "format": 'MM/DD/YYYY hh:mm:ss A'
                },
                "applyClass": "btn-info",
                "cancelClass": "btn-warning"
            });
        }

        //expandCurrentSpecimen: function(){
        //    $('#collapse'+this.currentSpecimen.guid).collapse('show');
        //},

        //collapseNonCurrentSpecimens: function() {
        //    var vm = this;
        //    this.specimens.forEach(function(s){
        //        if(vm.currentSpecimen === null || s.guid !== vm.currentSpecimen.guid)
        //            $('#collapse'+s.guid).collapse('hide');
        //    });
        //}

    }
};