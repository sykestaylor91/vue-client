<template>
    <div class="card card-accent-info dashboard-card-25">
        <div class="card-header">
            {{chartName}}
        </div>
        <div class="card-block m-0 p-0">
            <div v-bind:id="prop_id + '_regions_div'"></div>
        </div>
    </div>
</template>

<script src="./SpecimenGeochart.vue.js"></script>