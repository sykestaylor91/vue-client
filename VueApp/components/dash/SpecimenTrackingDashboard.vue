<template>
    <div class="container-fluid align-content-center p-0">
        <div class="row">
            <div class="col-auto">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#searchModal"><i class="fa fa-search"></i> Search Specimen Inventory</button>
            </div>
            <div class="col-auto">
                <ScanLookup v-on:scanLookup="scanLookup" :lookupMessage="dashboardState.scanLookupMessage" :lookupCssClass="dashboardState.lookupStateCssClass"></ScanLookup>
            </div>
            <div class="col-auto">
                <button class="btn btn-info float-right">Configure Dashboard</button>
            </div>
        </div>
        <div class="row m-0 p-0">
            <div class="card-columns mt-1">

                <AccessionOverview v-if="dashboardPlugins.indexOf('PatientDetail') >= 0 && dashboardState.accession !== null"
                                   :organization="organization"
                                   :accession="dashboardState.accession"
                                   class="inner-card-no-border"></AccessionOverview>

                <SpecimenStatus v-if="dashboardPlugins.indexOf('SpecimenStatus') >= 0 && dashboardState.currentSpecimen !== null"
                                :accessionGuid="dashboardState.accession.guid"
                                :specimens="dashboardState.accession.specimens"
                                :selectedSpecimens="dashboardState.selectedSpecimens"
                                :organization="organization"
                                :user="user"
                                @updateOthers="updateOthers">
                </SpecimenStatus>

                <SpecimenList v-if="dashboardPlugins.indexOf('SpecimenList') >= 0 && dashboardState.currentSpecimen !== null"
                              :accessionGuid="dashboardState.accession.guid"
                              :specimens="dashboardState.accession.specimens"
                              :selectedSpecimens="dashboardState.selectedSpecimens"
                              :updateNeeded="dashboardState.updateNeeded"
                              :organization="organization"
                              @changed="specimenChanged"
                              @updateOthers="updateOthers">
                </SpecimenList>

                <SpecimenAcquire v-if="(dashboardPlugins.indexOf('SpecimenAcquire') >= 0 || dashboardPlugins.indexOf('SpecimenPurchase') >= 0) && dashboardState.currentSpecimen !== null"
                                  :organization="organization"
                                  :specimen="dashboardState.currentSpecimen"
                                  :specimens="dashboardState.accession.specimens"
                                  :user="user"
                                  :selectedSpecimens="dashboardState.selectedSpecimens">
                </SpecimenAcquire>

                <SavedSearches v-if="dashboardPlugins.indexOf('SavedSearches') >= 0 && dashboardState.currentSpecimen !== null"
                               :user="user">
                </SavedSearches>
            </div>
        </div>
    </div>
</template>

<style type="text/css">
    @media (min-width: 34em) {
        .card-columns {
            -webkit-column-count: 2;
            -moz-column-count: 2;
            column-count: 2;
        }
    }
</style>

<script src="./SpecimenTrackingDashboard.vue.js">

</script>