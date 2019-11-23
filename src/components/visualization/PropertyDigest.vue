<template>
  <div 
    class="row p-2"
    style="margin-right:0px"
  >
    <div class="col-3 icon-content">
      <v-avatar 
        size="60"
        color="#376996"
      >
        <img 
          style="width:70px; height:70px;" 
          class="rounded-circle" 
          src="@/assets/images/logo.svg" 
          alt=""
        >
      </v-avatar>  
    </div>
    <div 
      class="col-9 roboto-regular text-dark"
      style="text-align: left"
    >
      <font color="#000000">
        <b>{{ $t('PropertyDigest.address') }}:</b>  
        {{ property.address }}, 
        {{ property.city }} - {{ property.state }}
        <br>
        <b>{{ $t('PropertyDigest.type') }}:</b> {{ $t('PropertyDigest.' + property.type_of_address.toLowerCase() ) }}
        <br>
        <b>{{ $t('PropertyDigest.zipcode') }}:</b> {{ property.BRZipCode }}
      </font>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertyDigest",
  props: {
    property: {
      default: function() {
        return {}
      },
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
