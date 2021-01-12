<template>
    <div class="card card-accent-info dashboard-card-36">
        <div class="card-header">
            Accession Overview
        </div>
        <div class="card-block m-0 p-0">
            <AccessionInfo :accession="accession"
                           :organization="organization"
                           :layout="'horizontal'"></AccessionInfo>
        </div>
    </div>
</template>
<script src="./AccessionOverview.vue.js"></script>
