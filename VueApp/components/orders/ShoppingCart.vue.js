import { mapGetters, mapActions } from 'vuex';

module.exports = {
    name: 'ShoppingCart',
    props: {
        user: Object,
        organization: Object
    },
    data: function ()
    {
        return {
            copyShippingAddress: true,
            shippingAddress: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalcode: "",
                country: ""
            },
            billingAddress: {
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalcode: "",
                country: ""
            },
            shippingMethod: "",
            paymentInfo: {
                cardNumber: "",
                expMonth: "",
                expYear: "",
                ccv: "",
                cardName: "",
            },
        };
    },
    created: function(){
        var vm = this;
        this.billingAddress = this.shippingAddress;

        var guid = vm.$route.params.guid ? vm.$route.params.guid : (vm.order.id>0 ? vm.order.guid : "f3e146d0-3f45-11e7-876a-17f754a1f27011");
        if(typeof guid !== 'undefined'){ //this might need to check for empty string instead of undefined
            vm.$parent.$store.dispatch('order/loadOrder', guid);
        }else if(typeof vm.order === 'undefined'){
            vm.$parent.$store.dispatch({type: 'order/newOrder', params: {user: vm.user, organization: vm.organization}});        
        }
        console.log('finished shopping cart create');
    },
    watch: {
        copyShippingAddress: function(val, oldVal){
            if(val){
                this.billingAddress = this.shippingAddress;
            }else{
                this.billingAddress = JSON.parse(JSON.stringify(this.billingAddress));
                this.shippingAddress = JSON.parse(JSON.stringify(this.shippingAddress));
            }
        }
    },
    methods:
        {
            saveSpecimenAcquire: function()
            {
                var customData = JSON.parse(this.order.customData);
                customData.shippingAddress = this.shippingAddress;
                customData.billingAddress = this.billingAddress;
                customData.shippingMethod = this.shippingMethod;
                customData.paymentInfo = this.paymentInfo;
                var order = this.$parent.$store.state.order.order;
                order.customData = JSON.stringify(customData);
                this.$parent.$store.dispatch('order/saveOrder', order);
            },
        },
    computed: {
        ...mapGetters('order', ['order']),
        totalQuantity: function(){
            var totalQty = 0;
            for(var i=0; i<this.order.specimens.length; i++ ){
                var specimen = this.order.specimens[i];
                totalQty += Number(specimen.orderSpecimenCustomData.quantity);
            }
            console.log("this.order.specimens", totalQty)
            return totalQty;
        },
        totalPrice: function(){
            var totalPrice = 0;
            for(var i=0; i<this.order.specimens.length; i++ ){
                var specimen = this.order.specimens[i];
                totalPrice += Number(specimen.orderSpecimenCustomData.quantity) * specimen.orderSpecimenCustomData.cost;
            }
            console.log("this.order.totalPrice", totalPrice)
            return totalPrice;
        }
        //...mapActions('order', ['newOrder','loadOrder','saveOrder'])
    }
};