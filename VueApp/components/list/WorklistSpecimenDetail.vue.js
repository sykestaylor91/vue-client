
import specimenState from './WorklistSpecimenDetail.vue.data.js';

import customDataHelpersMixin from '../../mixins/customDataHelpers.js';

import SpecimenInfo from "../entities/SpecimenInfo.vue";

module.exports = {
    name: "WorklistSpecimenDetail",
    props:{
        organization: Object,
        specimen: Object,
        specimenIndex: Number
    },
    components: {SpecimenInfo},
    mixins: [customDataHelpersMixin],
    data: function ()
    {
        return {
            //specimen: specimenState.specimen,
            options: specimenState.options
        };
    },
    methods:{
        getCost: function(specimen)
        {
            var vm = this;
            var cost = 40;
            var value = vm.currentSpecimenAttributeValue(specimen, 'Cost', true);
            if(value.name.length > 0)
                cost = value.name;
            return cost;
        }
    }
};