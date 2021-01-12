import specimenPurcahseData from './SpecimenAcquire.vue.data.js';
import SpecimenInfo from "../../entities/SpecimenInfo.vue";

import customDataHelpersMixin from '../../../mixins/customDataHelpers.js';
const uuidV1 = require('uuid/v1');

module.exports = {
    name: 'SpecimenAcquire',
    props: {
        selectedSpecimens: Array,
        specimens: Array,
        organization: Object,
        user: Object
    },
    data: function ()
    {
        return {
            addedCartQuantity: 0,
            groups: []
        };
    },
    mixins: [customDataHelpersMixin],
    components: {SpecimenInfo},
    created: function(){
        var vm = this;

        vm.selectedSpecimens.forEach(function(guid) {
            let spec = vm.specimens.find(function(s) { return s.guid === guid; });
            if(typeof spec !== 'undefined' && typeof spec.customData !== 'undefined' && typeof spec.customData.groupGuid !== 'undefined') {
                let groupGuid = spec.customData.groupGuid;
                var group = vm.groups.find(function(gr) { return gr.groupGuid === groupGuid; });
                if(typeof group === 'undefined') {
                    group = {groupGuid: spec.customData.groupGuid, primarySpecimen: spec, selectedQuantity: 0, maxQuantity: 1};
                    vm.groups.push(group);
                }   
                else{
                    group.maxQuantity++;
                }
            }
        });

    },
    methods:
        {
            addToCart: function(group){
                var vm = this;

                var groupSpecimens = vm.specimens.filter(s => s.customData.groupGuid === group.groupGuid);

                var order = vm.$store.state.order.order;

                if(vm.$store.state.order.order.guid === ''){                     
                    vm.$set(order, 'orgNameKey', vm.organization.nameKey);
                    vm.$set(order, 'guid', uuidV1());
                    vm.$set(order, 'customData', {});
                    vm.$set(order, 'createdHref', vm.user.href);
                    vm.$set(order, 'createdFullName', vm.user.fullName);
                }

                var orderSpecimens = vm.$store.state.order.order.specimens;
                
                for(var i = 0; i < group.selectedQuantity; i++)
                {
                    var specimen = groupSpecimens[i];
                    if(typeof specimen === 'undefined'){ //whatever
                        continue;
                    }
                    //this is temporary - fix cart to handle groups
                    var specimenLevelOrderData = {
                        quantity: 1,
                        cost: vm.currentSpecimenAttributeValue(specimen, "Cost", false).name
                    };  
                    vm.$set(specimen, 'orderSpecimenCustomData', specimenLevelOrderData);
                    
                    var existingSpecimen = orderSpecimens.find(s=>s.id === specimen.id);
                    if(!existingSpecimen){
                        orderSpecimens.push(specimen);
                    }
                    
                }   

                vm.$store.dispatch('order/saveOrder', order);

                var warnAlertDiv = $("#smallWarningAlert");
                var warnAlertSpan = $("#smallWarningAlertText");
                warnAlertSpan.text('Added ' + group.selectedQuantity + ' specimens to your cart.');
                warnAlertDiv.show();
                window.setTimeout(function () { warnAlertDiv.hide(); }, 3500);

                vm.$set(group, 'maxQuantity', (group.maxQuantity - group.selectedQuantity) < 0 ? 0 : (group.maxQuantity - group.selectedQuantity));
                vm.$set(group, 'selectedQuantity', 0);
            }
        }
};