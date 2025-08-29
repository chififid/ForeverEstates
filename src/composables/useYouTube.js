import { ref, computed } from "vue";

export function useYouTube() {
  const isYouTubeAPIReady = ref(false);
  const currentVideoId = ref("");
  const videoState = ref("unstarted"); // unstarted, ended, playing, paused, buffering, cued

  const extractVideoId = (url) => {
    if (!url) return "";
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    
    return "";
  };

  const createEmbedUrl = (videoId, options = {}) => {
    const defaultOptions = {
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      controls: 0,
      autoplay: 0,
      mute: 1,
      loop: 1,
      playlist: videoId,
      ...options
    };
    
    const params = new URLSearchParams();
    Object.entries(defaultOptions).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value);
      }
    });
    
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const createThumbnailUrl = (videoId, quality = "default") => {
    const qualities = {
      default: "default.jpg",
      mqdefault: "mqdefault.jpg",
      hqdefault: "hqdefault.jpg",
      sddefault: "sddefault.jpg",
      maxresdefault: "maxresdefault.jpg"
    };
    
    const qualityKey = qualities[quality] || qualities.default;
    return `https://img.youtube.com/vi/${videoId}/${qualityKey}`;
  };

  const validateVideoId = (videoId) => {
    // YouTube video ID format: 11 characters, alphanumeric, hyphens, underscores
    const pattern = /^[a-zA-Z0-9_-]{11}$/;
    return pattern.test(videoId);
  };

  const getVideoInfo = async (videoId) => {
    if (!validateVideoId(videoId)) {
      throw new Error("Invalid YouTube video ID");
    }
    
    try {
      // Note: This would require YouTube Data API v3
      // For now, return basic info
      return {
        id: videoId,
        thumbnail: createThumbnailUrl(videoId),
        embedUrl: createEmbedUrl(videoId),
        isValid: true
      };
    } catch (error) {
      console.error("Failed to get video info:", error);
      return {
        id: videoId,
        thumbnail: createThumbnailUrl(videoId),
        embedUrl: createEmbedUrl(videoId),
        isValid: false,
        error: error.message
      };
    }
  };

  const setVideoId = (id) => {
    if (validateVideoId(id)) {
      currentVideoId.value = id;
    }
  };

  const videoUrl = computed(() => {
    if (!currentVideoId.value) return "";
    return createEmbedUrl(currentVideoId.value);
  });

  const thumbnailUrl = computed(() => {
    if (!currentVideoId.value) return "";
    return createThumbnailUrl(currentVideoId.value);
  });

  const isVideoReady = computed(() => {
    return currentVideoId.value && validateVideoId(currentVideoId.value);
  });

  return {
    isYouTubeAPIReady,
    currentVideoId,
    videoState,
    extractVideoId,
    createEmbedUrl,
    createThumbnailUrl,
    validateVideoId,
    getVideoInfo,
    setVideoId,
    videoUrl,
    thumbnailUrl,
    isVideoReady
  };
}
