import { ref, computed } from "vue";

export function useContent() {
  const contentData = ref({});
  const isLoading = ref(false);
  const error = ref(null);

  const setContent = (data) => {
    contentData.value = data;
  };

  const updateContent = (updates) => {
    contentData.value = { ...contentData.value, ...updates };
  };

  const getContentByType = (type) => {
    if (Array.isArray(contentData.value)) {
      return contentData.value.filter(item => item.type === type);
    }
    return [];
  };

  const getContentById = (id) => {
    if (Array.isArray(contentData.value)) {
      return contentData.value.find(item => item.id === id);
    }
    return null;
  };

  const addContent = (newContent) => {
    if (Array.isArray(contentData.value)) {
      contentData.value.push(newContent);
    }
  };

  const removeContent = (id) => {
    if (Array.isArray(contentData.value)) {
      const index = contentData.value.findIndex(item => item.id === id);
      if (index !== -1) {
        contentData.value.splice(index, 1);
      }
    }
  };

  const generateUniqueId = (prefix = "item") => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const formatContent = (content, formatters = {}) => {
    if (typeof content === "string") {
      return content;
    }
    
    if (Array.isArray(content)) {
      return content.map(item => formatContent(item, formatters));
    }
    
    if (typeof content === "object" && content !== null) {
      const formatted = {};
      for (const [key, value] of Object.entries(content)) {
        if (formatters[key]) {
          formatted[key] = formatters[key](value);
        } else {
          formatted[key] = formatContent(value, formatters);
        }
      }
      return formatted;
    }
    
    return content;
  };

  const validateContent = (content, schema) => {
    if (!schema) return true;
    
    for (const [key, rule] of Object.entries(schema)) {
      if (rule.required && !content[key]) {
        return false;
      }
      
      if (rule.type && typeof content[key] !== rule.type) {
        return false;
      }
      
      if (rule.pattern && !rule.pattern.test(content[key])) {
        return false;
      }
    }
    
    return true;
  };

  const contentStats = computed(() => {
    if (Array.isArray(contentData.value)) {
      return {
        total: contentData.value.length,
        byType: contentData.value.reduce((acc, item) => {
          acc[item.type] = (acc[item.type] || 0) + 1;
          return acc;
        }, {})
      };
    }
    return { total: 0, byType: {} };
  });

  return {
    contentData,
    isLoading,
    error,
    setContent,
    updateContent,
    getContentByType,
    getContentById,
    addContent,
    removeContent,
    generateUniqueId,
    formatContent,
    validateContent,
    contentStats
  };
}
