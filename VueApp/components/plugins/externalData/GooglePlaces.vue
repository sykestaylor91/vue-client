<template>
    <div>
        <div v-bind:id="prop_id + '_autocomplete_div'">
            <input v-bind:id="prop_id + '_autocomplete'" type="text" v-on:blur="hideEdit()" v-on:focus="clearEdit()" />
            <br />
            <span class="font-xs text-gray-dark" v-on:click="hideEdit()">Cancel</span>
        </div>
        <div class="cursor-pointer" v-on:click="editPlace"  v-bind:id="prop_id + '_existingPlace_div'">
            <div v-if="typeof selectedPlace !== 'undefined' && typeof selectedPlace.address_components !== 'undefined'"
                 v-bind:id="prop_id + '_existingPlace'">
                <span class="font-weight-bold text-nowrap">{{selectedPlace.name}}</span>
                <div style="overflow: hidden;text-overflow: ellipsis;"
                     v-bind:title="selectedPlace.address_components.map(c=> c.long_name).join(' \n')">
                    <span class="text-nowrap font-xs" v-for="component in selectedPlace.address_components">
                        {{component.short_name}}&nbsp;
                    </span>
                </div>
            </div>
            <div v-else class="font-xs">
                No Location Selected                
            </div>
            <span class="font-xs text-gray-dark float-right">Click to Edit</span>
        </div>
    </div>
</template>

<script src="./GooglePlaces.vue.js"></script>
