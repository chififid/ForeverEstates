<script setup>
import BaseLogo from "@/ui/components/BaseLogo.vue";
import BaseContactLink from "@/ui/components/BaseContactLink.vue";
import BaseSocialLinks from "@/ui/components/BaseSocialLinks.vue";
import footerData from "@/assets/content/footer.json";
import headerData from "@/assets/content/header.json";
</script>

<template>
  <footer class="footer">
    <div class="container">

      <div class="footer-left">

        <div class="footer-columns">
          <div class="footer-adaptive-left">
            <div class="footer-column company-info">
              <div class="title">
                <BaseLogo class="logo" />
                <BaseSocialLinks class="social-links" />
              </div>
              <p class="company-description">
                {{ footerData.company.description }}
              </p>
              <BaseSocialLinks class="social-links" />
            </div>

            <div class="footer-column contact-info">
              <h3 class="column-title">Contact Information</h3>
              <BaseContactLink>
                <template #icon>
                  <img src="/src/assets/images/contact/phone.svg" alt="Phone" />
                </template>
                <template #text>{{ footerData.contact.phone.text }}</template>
              </BaseContactLink>

              <BaseContactLink>
                <template #icon>
                  <img src="/src/assets/images/contact/whatsapp.svg" alt="WhatsApp" />
                </template>
                <template #text>{{ footerData.contact.whatsapp.text }}</template>
              </BaseContactLink>


              <BaseContactLink class="address-link">
                <template #icon>
                  <img class="address-icon" src="/src/assets/images/footer/location.svg" alt="Location" />
                </template>
                <template #text>{{ footerData.contact.address.text }}</template>
              </BaseContactLink>
            </div>
          </div>

          <div class="footer-column quick-links">
            <h3 class="column-title">{{ footerData.navigation.title }}</h3>
            <nav class="footer-nav">
              <a v-for="link in headerData.navigation.links" :key="link.label" :href="link.hash" class="nav-link">
                {{ link.label }}
              </a>
            </nav>
          </div>
        </div>


        <div class="footer-bottom">
          <div class="copyright">
            {{ footerData.bottom.copyright }}
          </div>
          <div class="policy-links">
            <a v-for="policy in footerData.bottom.policies" :key="policy.label" :href="policy.hash" class="policy-link">
              {{ policy.label }}
            </a>
          </div>
        </div>
      </div>

      <div class="footer-right">
        <div class="quick-links">
          <h3 class="column-title">{{ footerData.navigation.title }}</h3>
          <nav class="footer-nav">
            <a v-for="link in headerData.navigation.links" :key="link.label" :href="link.hash" class="nav-link">
              {{ link.label }}
            </a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
$apaptive-margin: calc((100vw - $padding-side * 2 - 760px) / 2);

.footer {
  background: white;
  padding-top: $padding-block;
  border-top: 1px solid $color-grey-light;
  margin: 0 auto;
}

.container {
  max-width: calc($max-container-width);
  padding: 0 $padding-side;
  margin: 0 auto;
  display: flex;
}

.footer-columns {
  display: flex;
  margin-bottom: 40px;
  justify-content: space-between;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-left {
  flex: 1;
}

.company-info {
  max-width: 380px;
  gap: $spacing-lg;

  .company-description {
    color: $color-grey-dark;
    line-height: 144.4%;
  }
}

.contact-info {
  margin-top: 10px;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;

  .column-title {
    font-size: $font-size-md;
    font-weight: 600;
  }

  .location-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .address-link {
    color: $color-blue;
    font-size: $font-size-base;
    line-height: 150%;
    align-items: start;
  }

  .address-icon {
    padding-top: 2px;
  }
}

.footer-right {
  margin-left: 290px;
}

.quick-links {
  margin: 10px 0 0 auto;
  width: max-content;

  .column-title {
    font-size: $font-size-md;
    font-weight: 600;
    margin-bottom: 25px;
  }

  .footer-nav {
    display: inline-flex;
    flex-direction: column;
    gap: $spacing-lg;
  }

  .nav-link {
    color: $color-grey-dark;
    text-decoration: none;
    font-family: Inter;
    position: relative;
    cursor: pointer;
    transition: color $transition ease;

    &:hover {
      color: $color-black;
    }
  }
}

.title .social-links {
  display: none;
}

.footer-column.quick-links {
  display: none;
}

.footer-bottom {
  border-top: 1px solid $color-grey-light;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copyright {
  color: $color-grey-dark;
  font-weight: 500;
  font-size: $font-size-sm;
}

.policy-links {
  display: flex;
  gap: 32px;
}

.policy-link {
  color: $color-grey-dark;
  font-size: $font-size-sm;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  transition: color $transition ease;

  &:hover {
    color: $color-black;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1.2px;
    background-color: $color-grey-light;
    transition:
      width $transition ease,
      background-color $transition ease;
  }

  &:hover {
    &::after {
      background-color: $color-black;
    }
  }
}

.footer-adaptive-left {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

@media screen and (max-width: $breakpoint-xxl) {
  .footer-right {
    margin-left: $apaptive-margin;
  }
}

@media screen and (max-width: $breakpoint-lg) {
  .footer {
    padding-top: $padding-block-lg;
  }

  .footer-columns {
    flex-direction: column;
    margin-bottom: 25px;
  }

  .footer-left {
    flex: auto;
  }

  .footer-right {
    margin-left: $padding-side;
  }

  .footer-column {
    width: 100%;
    max-width: 100%;
  }
  
  .footer-adaptive-left {
    flex-direction: column;
  }

  .contact-info {
    margin-top: 25px;
    gap: 25px;
  }

  .social-links {
    display: none;
  }

  .title .social-links {
    display: flex;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .container {
    padding: 0 $padding-side-adaptive;
  }

  .footer-column.quick-links {
    display: flex;
    width: max-content;
    margin-left: 40px;
    text-wrap: nowrap;
  }

  .footer-right .quick-links {
    display: none;
  }

  .footer-columns {
    flex-direction: row;
  }

  .footer-right {
    margin-left: 0;
  }
}

@media screen and (max-width: $breakpoint-sm) {
  .footer {
    padding-top: $padding-block-sm;
  }

  .footer-columns {
    flex-direction: column;
  }

  .footer-column.quick-links {
    margin: 25px 0 0 0;
  }

  .contact-info {
    gap: 25px;
  }

  .contact-link > * {
    font-size: $font-size-base;
  }

  .quick-links .footer-nav {
    gap: 25px;
  }
  
  .quick-links .column-title {
    margin-bottom: 25px;
  }

  .company-info {
    gap: 22px;
  }
}

@media screen and (max-width: 490px) {
  .footer-bottom {
    flex-direction: column;
  }

  .policy-links {
    margin-top: 25px;
  }
}

@media screen and (max-width: $breakpoint-xs) {
  .social-links {
    display: flex;
  }

  .title .social-links {
    display: none;
  }
}
</style>
