import axios from 'axios';

var visualization;
var vm;
var axiosInstance;

module.exports = {
    name: "SpecimenGeochart",
    props: {
        prop_id: String,
        region: String,
        mode: String,
        chartName: String
    },
    data: function () {
        return {
            placeData: []
        }
    },
    created: function () {
        vm = this;
        axiosInstance = axios.create({vm: vm});
        vm.getPlaces();
    },
    mounted: function () {     
        //google.charts.load('current', { 'packages': ['geochart'] } );      //see main    
    },
    methods: {
        //loadMap: function (id) {
        //    google.charts.setOnLoadCallback(function() { vm.drawMap(id); }); //i think axios is handling any need for a callback
        //},
        drawMap: function (id, mode, type) {
            var chart = new google.visualization.GeoChart(document.getElementById(id + '_regions_div'));
            var options = {};            

            options["width"] = '450';
            options["height"] = '320';

            if (vm.region !== '') {
                options["region"] = vm.region;
            }
            
            if(type==='State'){
                options["region"] = 'US';
                options["resolution"] = 'provinces';
            }

            var data = new google.visualization.DataTable();
            data.addColumn('string', type);
            data.addColumn('number', mode);
            data.addRows(vm.placeData.length);
            vm.placeData.forEach(function(p, index) {
                data.setCell(index, 0, p.CountryRegion);
                data.setCell(index, 1, p.Count);
            });

            console.log('drawing map ' + id)
            chart.draw(data, options);
        },
        getPlaces: function () {
            axiosInstance.get('/api/Analysis/get_accession_specimen_geomap').then(response => {
                var type;
                if(response.data.every(p=> p.country === 'US' && p.region !== p.country)){
                    type = 'State';
                }                    
                else{
                    type = 'Country';
                }                                                   
                switch (response.config.vm.mode) {
                    case "Accessions":
                        response.config.vm.$set(vm, 'placeData', response.data.map(function (d) { 
                            return JSON.parse('{ "CountryRegion": "' + (response.config.vm.type === 'Country' ? d.country : 'US-' + d.region) + '", "Count": ' + d.accessions + ' }');
                        }));
                        break;
                    default:
                        response.config.vm.$set(vm, 'placeData', response.data.map(function (d) { 
                            return JSON.parse('{ "CountryRegion": "' + (response.config.vm.type === 'Country' ? d.country : 'US-' + d.region) + '", "Count": ' + d.specimens + ' }'); 
                        }));
                        break;
                }
                vm.drawMap(response.config.vm.prop_id, response.config.vm.mode, type);
            });

        },
        //resolveMappableRegion(address_components) {
        //    var mappableRegion = '';

        //    var country = address_components.find(c => c.types.indexOf("country") > -1);
        //    var level1 = address_components.find(c => c.types.indexOf("administrative_area_level_1") > -1);
        //    var metro = address_components.find(c => c.types.indexOf("locality") > -1);

        //    if (country.short_name === 'US' && typeof metro !== 'undefined') {
        //        mappableRegion = metro.short_name;
        //    }
        //    else if (typeof level1 !== 'undefined') {
        //        mappableRegion = level1.short_name;
        //    }
        //    else { mappableRegion = country.short_name }

        //    return mappableRegion;
        //}
    },
    computed: {
        //placeData:
        //{
        //    get: function () {

        //        var placeRegions = places.map(p => vm.resolveMappableRegion(p.address_components));

        //        var countedRegions = placeRegions.reduce(function (allRegions, region) {
        //            if (region in AllRegions) {
        //                AllRegions[region]++;
        //            }
        //            else {
        //                AllRegions[region] = 1;
        //            }
        //            return AllRegions;
        //        }, {});

        //        return countedRegions;

        //    }
        //}
    }
};