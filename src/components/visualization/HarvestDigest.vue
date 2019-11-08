<template>
  <div 
    class="row p-2"
    style="margin-right:0px"
  >
    <div class="col-3 icon-content">
      <img 
        style="width:70px; height:70px;" 
        class="rounded-circle" 
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgeographical.co.uk%2Fmedia%2Fk2%2Fitems%2Fcache%2Fbca1dd559f75f65255fb90327f144139_XL.jpg&f=1&nofb=1" 
        alt=""
        />
    </div>
    <div 
      class="description-content col-9 roboto-regular "
    >
      <h6>Titulo</h6>

      <b>{{ this.$t('HarvestDigest.date') }}:</b>  {{ harvest.date }}
      <br>
      <b>Status:</b> {{ harvest.status }}
      <br>
      <b>{{ this.$t('HarvestDigest.volunteer') }}:</b> {{ harvest.min_volunteers }} 
      {{ this.$t('HarvestDigest.to') }} {{ harvest.max_volunteers }}
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
  .description-content {
    text-align: left;
    font-size: 15px;
  }

  .icon-content {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
  }
</style>