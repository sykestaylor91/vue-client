﻿import { mapGetters, mapActions } from 'vuex';

module.exports = {
    name: 'SecondarySidebar',
    props: {
        user: Object,
        organization: Object,
        historyItems: Array
	},
	created: function () {
		this.$forceUpdate();
	},
	methods: {
        historyItemTypes: function () {
            var vm = this;
            var types = [];
            var allTypes = vm.historyItems.map(function (h) { return { type: h.type, title: h.route.meta.historyItemName }; });
            for (var i = 0; i < allTypes.length; i++) {
                if (typeof types.find(t => t.type === allTypes[i].type) === 'undefined') {
                    types.push(allTypes[i]);
                }
            }
            return types;
        },
        getHistoryItemsByType: function (type) {
            var vm = this;
            return vm.historyItems.filter(h => h.type === type);
        }
    },
    watch:
        {
            historyItems: {
                handler: function () {
                    var vm = this;
                    var newItem = vm.historyItems.find(h => h.updated && !h.processed);
                    if (typeof newItem !== 'undefined') {
                        newItem["processed"] = true;
                        if (newItem.showWarning) {
                            var warnAlertDiv = $("#smallWarningAlert");
                            var warnAlertSpan = $("#smallWarningAlertText");
                            warnAlertSpan.text(newItem.warning);
                            warnAlertDiv.show();
                            window.setTimeout(function () { warnAlertDiv.hide(); }, 3500);
                        }
                    }
                },
                deep: true
            }
	},


};