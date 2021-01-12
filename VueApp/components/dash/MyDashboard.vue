<template>

    <div class="container-fluid align-content-center p-0">
        <div class="row m-0 p-0">
            <div class="bricklayer mt-1">
                <SpecimenGeochart id="1" :prop_id="'specimen_geochart0'" :mode="'Specimens'" :region="''" :chartName="'Specimens by Region'" :key="1"></SpecimenGeochart>

                <SpecimenGeochart id="2" :prop_id="'specimen_geochart1'" :mode="'Accessions'" :region="''" :chartName="'Accessions by Region'" :key="2"></SpecimenGeochart>

            </div>
        </div>
    </div>

</template>

<script src="./MyDashboard.vue.js">


</script>
