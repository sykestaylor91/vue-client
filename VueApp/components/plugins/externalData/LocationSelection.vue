<template>
    <div class="form-control">

        <multiselect v-bind:id="prop_id + '_country'"
                     track-by="name" label="name"
                     placeholder="Select Country" :options="countries.all" :searchable="true"
                     :multiple="false" :allow-empty="true"
                     v-bind:value="currentLocation.country"
                     v-on:input="countryChanged"
                     selectLabel="" deselectLabel="" selectedLabel="">
        </multiselect>

        <multiselect v-bind:id="prop_id + '_state_province'"
                     placeholder="Select State/Province" :options="statesProvinces" :searchable="true"
                     :multiple="false" :allow-empty="true"
                     v-bind:value="currentLocation.stateProvince"
                     v-on:input="stateProvinceChanged"
                     selectLabel="" deselectLabel="" selectedLabel="">
        </multiselect>
    </div>
</template>

<script src="./LocationSelection.vue.js"></script>