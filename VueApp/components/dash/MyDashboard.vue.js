import SpecimenGeochart from '../plugins/dashboardCards/SpecimenGeoChart.vue';

module.exports = {
    name: 'MyDashboard',
    components: {
        SpecimenGeochart,
    },
    mounted: function()
    {
        var bricklayer = new Bricklayer(document.querySelector('.bricklayer'));
    },
    watch: {
        '$route': function () {
            window.document.title = vm.organization.name + ' - ' + vm.$route.meta.title;
        },
    },
};