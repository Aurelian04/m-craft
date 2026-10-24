<script setup lang="ts">
// Set mic de iconuri desenate pe aceeași grilă de 24px, linie 1.8.
// WhatsApp folosește glifa recognoscibilă a mărcii.
defineProps<{ name: 'phone' | 'whatsapp' | 'mail' | 'search' | 'chevron-down' | 'chevron-left' | 'chevron-right' | 'close' | 'menu' | 'play' | 'pause' | 'pin' | 'arrow-right' | 'check' }>()
</script>

<template>
  <svg v-if="name === 'whatsapp'" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
  </svg>
  <svg v-else viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="square" stroke-linejoin="miter">
    <template v-if="name === 'phone'">
      <path d="M5 3.5h3.6l1.7 4.3-2.2 1.5a11 11 0 0 0 6.6 6.6l1.5-2.2 4.3 1.7V19a1.5 1.5 0 0 1-1.5 1.5C10.5 20.5 3.5 13.5 3.5 5A1.5 1.5 0 0 1 5 3.5Z" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'mail'">
      <rect x="3" y="5.5" width="18" height="13" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </template>
    <template v-else-if="name === 'search'">
      <circle cx="10.5" cy="10.5" r="6" />
      <path d="m15 15 5.5 5.5" />
    </template>
    <path v-else-if="name === 'chevron-down'" d="m6 9 6 6 6-6" />
    <path v-else-if="name === 'chevron-left'" d="m15 5-7 7 7 7" />
    <path v-else-if="name === 'chevron-right'" d="m9 5 7 7-7 7" />
    <path v-else-if="name === 'arrow-right'" d="M4 12h15m-6-6 6 6-6 6" />
    <path v-else-if="name === 'close'" d="m5.5 5.5 13 13m0-13-13 13" />
    <path v-else-if="name === 'menu'" d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    <path v-else-if="name === 'check'" d="m4.5 12.5 5 5 10-11" />
    <path v-else-if="name === 'play'" d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" stroke="none" />
    <template v-else-if="name === 'pause'">
      <path d="M8 5v14M16 5v14" stroke-width="3" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </template>
  </svg>
</template>
