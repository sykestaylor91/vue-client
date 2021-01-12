import { mapGetters, mapActions } from 'vuex';
import Sidebar from './main/Sidebar.vue';
import SecondarySidebar from './main/SecondarySidebar.vue';
import Navbar from './main/Navbar.vue';
import AppFooter from './main/AppFooter.vue';
import SearchModal from './tools/SearchModal.vue';
import organizationStyleMixin from '../mixins/organizationStyle.js';

module.exports = {
    name: 'Main',
    components: {
        Sidebar,
        Navbar,
        SecondarySidebar,
        AppFooter,
        SearchModal
    },
    //data: function(){
    //    state:
    //        {

    //        }
    //},
    mixins: [organizationStyleMixin],
    methods: {
        postOrgLoadActions: function(vm){
            if(!vm.lookupDataLoaded)
                vm.$parent.$store.dispatch({type: 'lookupData/loadGlobalLookupData', orgNameKey: vm.organization.nameKey});
            window.document.title = vm.organization.name + ' - ' + vm.$route.meta.title;
            vm.setLogo(vm);
            vm.setCSS(vm);            
        },
        startOrgWatcher: function(vm){
            vm.$parent.$store.watch(
                function(state){
                    return state.organization.loaded;
                },
                function() {if(vm.organizationLoaded)
                    vm.$nextTick(function() {vm.postOrgLoadActions(vm);})}
                );
        },
        addHistoryItemHandler: function(replace, item)
        {
            var vm = this;
            var itemIndex = vm.historyItems.findIndex(function(h) {return h.itemGuid === item.itemGuid});     
            if(itemIndex > -1 && replace){
                vm.historyItems.splice(itemIndex,1); //remove
                itemIndex = -1;
            }
            if(itemIndex > -1){
                vm.$set(vm.historyItems, itemIndex, item);}
            else{
                vm.historyItems.push(item);} //add
        }

    },
    watch:{
        '$route': function () {
            if(this.organizationLoaded)
                this.postOrgLoadActions(this);
            else
                this.startOrgWatcher(this);
        },
    },
    created: function() {
        var vm = this;
        if(!vm.userLoaded)
            vm.$parent.$store.dispatch('user/getUser');
        if(!vm.organizationLoaded){
            vm.$parent.$store.dispatch('organization/loadOrganization');            
        }
        vm.startOrgWatcher(vm);
        
    },
    mounted: function() {    
        google.charts.load('current', { 'packages': ['geochart'] } );            
        $(".alert").hide();
    },
    computed: {
        ...mapGetters('user', ['user', 'userLoaded']),
        ...mapGetters('organization', ['organization', 'organizationLoaded']),
        ...mapGetters('history', ['historyItems']),
        ...mapGetters('lookupData', ['clients', 'patients', 'doctors','labs','lookupDataLoaded'])
        },
};
