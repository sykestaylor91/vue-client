<template>
    <div class="card card-compact card-no-outer-border">
        <div v-if="!compact" class="card-header">Demographics</div>
        <div class="card-block wrap-unset">
            <div v-if="compact">
                <div class="row m-0 p-0">
                    <div class="col-auto" v-for="att in getPatientAttributesBySection('Demographics')">
                        <div class="row m-0 p-0">
                            <div class="col-auto attributeBox">
                                <span class="label-left attributeBoxSpacing">{{att.label}}:</span>
                                <span v-if="Array.isArray(currentPatientAttributeValue(patient, att.name, false))">
                                    <span class="w-100 text-right" v-if="currentPatientAttributeValue(patient, att.name, false).length === 0">
                                        {{'' | noData}}
                                    </span>
                                    <span v-else class="w-100 text-right" v-for="(value, index) in currentPatientAttributeValue(patient, att.name, false)">
                                            {{value.name}}{{(index + 1 < currentPatientAttributeValue(patient, att.name, false).length) ? '&nbsp;|&nbsp;' : ''}}
                                    </span>
                                </span>
                                <span v-else class="w-100 text-right">
                                    {{currentPatientAttributeValue(patient, att.name, true).name | noData}}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="row m-0 underline-light-grey" v-for="att in getPatientAttributesBySection('Demographics')">
                <div class="col-auto mr-1">
                    <label v-bind:for="'attValue' + patient.id + att.name" class="label-black">
                        <strong>{{att.label}}</strong>:
                    </label>
                </div>
                <div class="col-auto" v-bind:id="'attValue' + patientId + att.name">
                    <div v-if="Array.isArray(currentPatientAttributeValue(patient, att.name, false))" class="row m-0 p-0">
                        <span v-if="currentPatientAttributeValue(patient, att.name, false).length === 0" class="w-100 text-right">
                            {{'' | noData}}
                        </span>
                        <!--Careful with "white-space: pre" style - every line break in the editor will be reflected in output-->
                        <span v-else class="w-100 text-right" style="white-space: pre;">{{
                            getArrtibuteValueFromArray(currentPatientAttributeValue(patient, att.name, false), true)
                      }}</span>
                    </div>
                    <div v-else class="w-100 text-right">
                        {{currentPatientAttributeValue(patient, att.name, true).name | noData}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="./PatientInfo.vue.js"></script>