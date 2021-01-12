<template>
    <div class="card card-accent-info">
        <div class="card-header">
            <span class="specimenLabel">Specimen</span> Acquisition
        </div>
        <div class="card-block p-0 text-nowrap">
            <div v-for="specGroup in groups" class="container-fluid mt-h">
                <div class="row m-0">
                    <div class="col-auto">
                        <label class="label-black">Specimen:</label>
                    </div>
                    <div class="col-auto text-right">
                        {{(specGroup.primarySpecimen.externalId === '' || specGroup.primarySpecimen.externalId === null ? '# ' + specGroup.primarySpecimen.id : specGroup.primarySpecimen.externalId) + ' - ' + specGroup.primarySpecimen.type.type}}
                    </div>
                </div>
                <div class="row m-0">
                    <div class="col-auto">
                        <label class="label-black">Quantity:</label>
                    </div>
                    <div class="col-auto text-center">
                       <input v-if="specGroup.maxQuantity > 0" type="number" min="0" v-bind:max="specGroup.maxQuantity" class="number-small" v-model="specGroup.selectedQuantity" />
                       <input v-else type="number" min="0" max="0" class="number-small" disabled="disabled"/>
                    </div>
                    <div class="col-auto">
                        <button v-if="specGroup.maxQuantity > 0" v-on:click="addToCart(specGroup)" class="btn btn-info btn-sm float-right">
                            Add to Cart
                        </button>
                        <button v-else disabled="disabled" class="btn btn-info btn-sm float-right">
                            Add to Cart
                        </button>
                    </div>
                </div>
                <div class="row m-0">
                    <div class="col-auto p-0">
                        <SpecimenInfo :organization="organization"
                                      :specimen="specGroup.primarySpecimen" />
                    </div>
                </div>
                <hr />
            </div>
        </div>
    </div>
</template>
<script src="./SpecimenAcquire.vue.js"></script>
