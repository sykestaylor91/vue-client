<template>
    <div id="worklistTableWrapper" class="table-responsive">
        <table id="worklistTable" class="nowrap table table-bordered table-condensed table-hover table-primary">
            <thead>
                <tr>
                    <!--<th>ID</th>
                    <th>Created</th>
                    <th>Client</th>-->
                    <th class="accessionLabel">Accession</th>
                    <th class="specimenLabel">Specimen</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in worklist">
                    <td>
                        <AccessionInfo :organization="organization" :accession="row">
                        </AccessionInfo>
                        <!--<router-link :to="{ name: 'Edit Accession', params: { id: row.id, orgNameKey: organization.nameKey }}">
                            Edit <span class="accessionLabel">Accession</span> { {row.id} }
                        </router-link>-->
                    </td>
                    <td>
                        <WorklistSpecimens :organization="organization" :specimens="row.specimens">
                        </WorklistSpecimens>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script src="./Worklist.vue.js">
</script>

<style type="text/css">
    table.nowrap th {
        white-space: nowrap !important;
    }

    table.nowrap td {
        white-space: nowrap !important;
    }

    table td {
        vertical-align: top;
    }

    .dataTables_wrapper .row {
        margin-top: 0px !important;
    }
</style>