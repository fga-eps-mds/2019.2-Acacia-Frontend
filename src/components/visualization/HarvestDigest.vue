<template>
  <div class="row p-2">
    <div class="col-3">
      <img 
        style="width:70px; height:70px" 
        class="rounded-circle" 
        src="'https://external-content.duckduckgo.com/iu/?u=http' + 
             '%3A%2F%2Fgeographical.co.uk%2Fmedia%2Fk2%2Fitems%2Fcache' + 
             '%2Fbca1dd559f75f65255fb90327f144139_XL.jpg&f=1&nofb=1'" 
        alt=""
        >
    </div>
    <div class="col-9">
        Date:
        {{ harvest.date }}
        <br>
        Status:
        {{ harvest.status }}
        <br>
        Volunteers:
        {{ harvest.min_volunteers }} to
        {{ harvest.max_volunteers }}
    </div>
  </div>
</template>

<script>
export default {
  name: "HarvestDigest",
  props: {
    harvest: {
      default: {},
      type: Object
    }
  }
}
</script>

<style>

</style>