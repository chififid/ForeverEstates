<script setup>
defineProps({
  videoId: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="video-wrapper">
    <div class="video-container">
      <div class="youtube-player">
        <div class="black-screen"></div>
      </div>
    </div>

    <div class="bgs">
      <img src="@/assets/images/about/stamp.png" class="bg bg-stamp" />
      <img src="@/assets/images/about/clip.png" class="bg bg-clip" />
      <img src="@/assets/images/about/signature.png" class="bg bg-signature" />
      <img src="@/assets/images/about/skyscraper.png" class="bg bg-skyscraper" />
      <img src="@/assets/images/about/signature-2.png" class="bg bg-signature-2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.video-wrapper {
  width: 100%;
  font-size: $font-size-lg;
  line-height: 150%;
  letter-spacing: -0.01px;
  position: relative;
}

.video-header {
  text-align: center;
  margin-bottom: 20px;
}

.video-title {
  font-size: $font-size-md;
  color: $color-grey-dark;
}

.video-container {
  position: relative;
  border-radius: 16px;
  border: 1px solid #D4D4D4;
  background: linear-gradient(84deg, #FFF -7.72%, #EBEBEB 103.44%);
  box-shadow: $common-shadow $color-black-shadow;
  padding: 10px;
  z-index: 2;
}

.youtube-player {
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  line-height: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    box-shadow: -4px -4px 8px 0 rgba(0, 0, 0, 0.1) inset;
    pointer-events: none;
    z-index: 1;
  }
}

.black-screen {
  width: 100%;
  height: 100%;
  background: #000000;
  border-radius: 10px;
  display: block;
}

.bg {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: multiply;

  &-stamp {
    bottom: -30px;
    left: -80px;
  }

  &-clip {
    top: -40px;
    left: 25px;
  }

  &-signature {
    top: -50px;
    right: 25px;
  }

  &-skyscraper {
    bottom: -430px;
    left: 20px;
  }

  &-signature-2 {
    bottom: -440px;
    right: 25px;
  }
}

@media screen and (max-width: $breakpoint-md) {
  .video-container {
    border-radius: 12px;
    background: linear-gradient(84deg, #FFF -7.72%, #EBEBEB 103.44%);
    padding: 8px;
  }

  .youtube-player {
    border-radius: 8px;

    &::after {
      border-radius: 8px;
    }
  }

  .black-screen {
    border-radius: 8px;
  }

  .bg {
    transform: scale(0.7);

    &-stamp {
      left: -45px;
      bottom: -30px;
    }

    &-clip {
      left: 10px;
    }

    &-signature {
      right: 10px;
    }

    &-skyscraper {
      bottom: -390px;
      left: 50px;
    }

    &-signature-2 {
      bottom: -400px;
      right: 30px;
    }
  }
}
</style>
