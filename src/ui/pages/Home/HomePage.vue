<script setup>
import HomePageHero from "@/ui/pages/Home/HomePageHero.vue";
import HomePageVideo from "@/ui/pages/Home/HomePageVideo.vue";
import HomePageAboutUs from "@/ui/pages/Home/HomePageAboutUs.vue";
import HomePageServices from "@/ui/pages/Home/HomePageServices.vue";
import HomePageWhyChooseUs from "@/ui/pages/Home/HomePageWhyChooseUs.vue";
import HomePageFaq from "@/ui/pages/Home/HomePageFaq.vue";
import HomePageContact from "@/ui/pages/Home/HomePageContact.vue";
import HomePageFloatingVideo from "@/ui/pages/Home/HomePageFloatingVideo.vue";
</script>

<template>
  <HomePageHero id="top" class="block"/>
  <HomePageVideo class="block"/>
  <HomePageAboutUs id="about" class="block"/>
  <HomePageServices id="services" class="block"/>
  <HomePageWhyChooseUs id="why" class="block"/>
  <HomePageFaq id="faq" class="block"/>
  <HomePageContact id="contact" class="block"/>
  <HomePageFloatingVideo/>
</template>
