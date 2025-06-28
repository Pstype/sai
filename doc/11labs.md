Directory structure:
└── video-to-sfx/
    ├── README.md
    ├── components.json
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── .env.example
    ├── .gitignore
    ├── .vercelignore
    ├── app/
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── api/
    │   │   ├── interface.ts
    │   │   └── route.ts
    │   └── state/
    │       ├── orchestrator.ts
    │       └── player.ts
    ├── components/
    │   └── ui/
    │       ├── aspect-ratio.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── file-input.tsx
    │       ├── progress.tsx
    │       └── select.tsx
    ├── frostin-ui/
    │   ├── index.ts
    │   ├── components/
    │   │   ├── delayed-mount.tsx
    │   │   ├── index.ts
    │   │   ├── light.tsx
    │   │   ├── mask.tsx
    │   │   ├── mouse.tsx
    │   │   ├── scroll-mount.tsx
    │   │   └── scroll.tsx
    │   └── utils/
    │       ├── clocks.tsx
    │       ├── gradients.ts
    │       ├── index.ts
    │       ├── math.ts
    │       ├── motion.tsx
    │       ├── shadows.ts
    │       ├── springs.ts
    │       └── types.ts
    ├── lib/
    │   ├── mergeAndDownload.ts
    │   ├── utils.ts
    │   └── videoToSFX.ts
    └── public/

================================================
FILE: examples/sound-effects/video-to-sfx/README.md
================================================
# Video to Sound Effects Demo

We built this demo to show the power of the ElevenLabs Texts to Sounds Effects API. You can upload any video and add AI-generated sound effects.

How it works:

- Extracts 4 frames from the video at 1 second intervals (all client side)
- Sends the frames and a prompt to GPT-4o to create the custom Text to sound effects prompt
- Uses the prompt to create a sound effect with the [ElevenLabs Text to Sounds Effects API](https://elevenlabs.io/docs/api-reference/how-to-use-text-to-sound-effects)
- Combines the video and audio on the client side with ffmpeg.wasm for a single file to download
- Hosted on Vercel at [videotosoundeffects.com](https://www.videotosoundeffects.com/)

![Screenshot elevenlabs-video-to-sfx vercel app (Arc) 2024-06-16 at 23 32@2x](https://github.com/elevenlabs/elevenlabs-examples/assets/22766134/eaefd266-2bc1-4d51-9fe1-5316e5ee43c0)

![Screenshot elevenlabs-video-to-sfx vercel app (Arc) 2024-06-16 at 23 33@2x](https://github.com/elevenlabs/elevenlabs-examples/assets/22766134/20fba872-e8d1-4f30-92af-fcb52bab45da)



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



================================================
FILE: examples/sound-effects/video-to-sfx/components.json
================================================
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "gray",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}


================================================
FILE: examples/sound-effects/video-to-sfx/next.config.mjs
================================================
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;



================================================
FILE: examples/sound-effects/video-to-sfx/package-lock.json
================================================
{
  "name": "video-to-sfx",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "video-to-sfx",
      "version": "0.1.0",
      "dependencies": {
        "@ffmpeg/ffmpeg": "^0.12.10",
        "@ffmpeg/util": "^0.12.1",
        "@hookform/resolvers": "^3.6.0",
        "@radix-ui/react-accordion": "^1.1.2",
        "@radix-ui/react-alert-dialog": "^1.0.5",
        "@radix-ui/react-aspect-ratio": "^1.0.3",
        "@radix-ui/react-avatar": "^1.0.4",
        "@radix-ui/react-checkbox": "^1.0.4",
        "@radix-ui/react-collapsible": "^1.0.3",
        "@radix-ui/react-context-menu": "^2.1.5",
        "@radix-ui/react-dialog": "^1.0.5",
        "@radix-ui/react-dropdown-menu": "^2.0.6",
        "@radix-ui/react-hover-card": "^1.0.7",
        "@radix-ui/react-label": "^2.0.2",
        "@radix-ui/react-menubar": "^1.0.4",
        "@radix-ui/react-navigation-menu": "^1.1.4",
        "@radix-ui/react-popover": "^1.0.7",
        "@radix-ui/react-progress": "^1.0.3",
        "@radix-ui/react-radio-group": "^1.1.3",
        "@radix-ui/react-scroll-area": "^1.0.5",
        "@radix-ui/react-select": "^2.0.0",
        "@radix-ui/react-separator": "^1.0.3",
        "@radix-ui/react-slider": "^1.1.2",
        "@radix-ui/react-slot": "^1.0.2",
        "@radix-ui/react-switch": "^1.0.3",
        "@radix-ui/react-tabs": "^1.0.4",
        "@radix-ui/react-toast": "^1.1.5",
        "@radix-ui/react-toggle": "^1.0.3",
        "@radix-ui/react-toggle-group": "^1.0.4",
        "@radix-ui/react-tooltip": "^1.0.7",
        "@tanstack/react-query": "^5.45.0",
        "@upstash/ratelimit": "^1.2.1",
        "@vercel/kv": "^2.0.0",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.1.1",
        "cmdk": "^1.0.0",
        "date-fns": "^3.6.0",
        "embla-carousel-react": "^8.1.5",
        "framer-motion": "^11.2.10",
        "geist": "^1.3.0",
        "input-otp": "^1.2.4",
        "lodash": "^4.17.21",
        "lucide-react": "^0.395.0",
        "mobx": "^6.12.4",
        "mobx-react": "^9.1.1",
        "next": "14.2.4",
        "next-themes": "^0.3.0",
        "openai": "^4.51.0",
        "posthog-js": "^1.139.2",
        "react": "^18",
        "react-day-picker": "^8.10.1",
        "react-dom": "^18",
        "react-dropzone": "^14.2.3",
        "react-hook-form": "^7.52.0",
        "react-resizable-panels": "^2.0.19",
        "react-textarea-autosize": "^8.5.3",
        "sonner": "^1.5.0",
        "tailwind-merge": "^2.3.0",
        "tailwindcss-animate": "^1.0.7",
        "use-scramble": "^2.2.15",
        "vaul": "^0.9.1",
        "zod": "^3.23.8"
      },
      "devDependencies": {
        "@types/lodash": "^4.17.5",
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        "postcss": "^8",
        "tailwindcss": "^3.4.1",
        "tone": "^15.0.4",
        "typescript": "^5"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.24.7",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.24.7.tgz",
      "integrity": "sha512-UwgBRMjJP+xv857DCngvqXI3Iq6J4v0wXmwc6sapg+zyhbwmQX67LUEFrkK5tbyJ30jGuG3ZvWpBiB9LCy1kWw==",
      "dependencies": {
        "regenerator-runtime": "^0.14.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@ffmpeg/ffmpeg": {
      "version": "0.12.10",
      "resolved": "https://registry.npmjs.org/@ffmpeg/ffmpeg/-/ffmpeg-0.12.10.tgz",
      "integrity": "sha512-lVtk8PW8e+NUzGZhPTWj2P1J4/NyuCrbDD3O9IGpSeLYtUZKBqZO8CNj1WYGghep/MXoM8e1qVY1GztTkf8YYQ==",
      "dependencies": {
        "@ffmpeg/types": "^0.12.2"
      },
      "engines": {
        "node": ">=18.x"
      }
    },
    "node_modules/@ffmpeg/types": {
      "version": "0.12.2",
      "resolved": "https://registry.npmjs.org/@ffmpeg/types/-/types-0.12.2.tgz",
      "integrity": "sha512-NJtxwPoLb60/z1Klv0ueshguWQ/7mNm106qdHkB4HL49LXszjhjCCiL+ldHJGQ9ai2Igx0s4F24ghigy//ERdA==",
      "engines": {
        "node": ">=16.x"
      }
    },
    "node_modules/@ffmpeg/util": {
      "version": "0.12.1",
      "resolved": "https://registry.npmjs.org/@ffmpeg/util/-/util-0.12.1.tgz",
      "integrity": "sha512-10jjfAKWaDyb8+nAkijcsi9wgz/y26LOc1NKJradNMyCIl6usQcBbhkjX5qhALrSBcOy6TOeksunTYa+a03qNQ==",
      "engines": {
        "node": ">=18.x"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.6.2",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.6.2.tgz",
      "integrity": "sha512-+2XpQV9LLZeanU4ZevzRnGFg2neDeKHgFLjP6YLW+tly0IvrhqT4u8enLGjLH3qeh85g19xY5rsAusfwTdn5lg==",
      "dependencies": {
        "@floating-ui/utils": "^0.2.0"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.6.5",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.6.5.tgz",
      "integrity": "sha512-Nsdud2X65Dz+1RHjAIP0t8z5e2ff/IRbei6BqFrl1urT8sDVzM1HMQ+R0XcU5ceRfyO3I6ayeqIfh+6Wb8LGTw==",
      "dependencies": {
        "@floating-ui/core": "^1.0.0",
        "@floating-ui/utils": "^0.2.0"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.0.tgz",
      "integrity": "sha512-lNzj5EQmEKn5FFKc04+zasr09h/uX8RtJRNj5gUXsSQIXHVWTVh+hVAg1vOMCexkX8EgvemMvIFpQfkosnVNyA==",
      "dependencies": {
        "@floating-ui/dom": "^1.0.0"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.2.tgz",
      "integrity": "sha512-J4yDIIthosAsRZ5CPYP/jQvUAQtlZTTD/4suA08/FEnlxqW3sKS9iAhgsa9VYLZ6vDHn/ixJgIqRQPotoBjxIw=="
    },
    "node_modules/@hookform/resolvers": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/@hookform/resolvers/-/resolvers-3.6.0.tgz",
      "integrity": "sha512-UBcpyOX3+RR+dNnqBd0lchXpoL8p4xC21XP8H6Meb8uve5Br1GCnmg0PcBoKKqPKgGu9GHQ/oygcmPrQhetwqw==",
      "peerDependencies": {
        "react-hook-form": "^7.0.0"
      }
    },
    "node_modules/@isaacs/cliui": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
      "integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
      "dependencies": {
        "string-width": "^5.1.2",
        "string-width-cjs": "npm:string-width@^4.2.0",
        "strip-ansi": "^7.0.1",
        "strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
        "wrap-ansi": "^8.1.0",
        "wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.5.tgz",
      "integrity": "sha512-IzL8ZoEDIBRWEzlCcRhOaCupYyN5gdIK+Q6fbFdPDg6HqX6jpkItn7DFIpW9LQzXG6Df9sA7+OKnq0qlz/GaQg==",
      "dependencies": {
        "@jridgewell/set-array": "^1.2.1",
        "@jridgewell/sourcemap-codec": "^1.4.10",
        "@jridgewell/trace-mapping": "^0.3.24"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/set-array": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@jridgewell/set-array/-/set-array-1.2.1.tgz",
      "integrity": "sha512-R8gLRTZeyp03ymzP/6Lil/28tGeGEzhx1q2k703KGWRAI1VdvPIXdG70VJc2pAMw3NA6JKL5hhFu1sJX0Mnn/A==",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.4.15",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.4.15.tgz",
      "integrity": "sha512-eF2rxCRulEKXHTRiDrDy6erMYWqNw4LPdQ8UQA4huuxaQsVeRPFl2oM8oDGxMFhJUWZf9McpLtJasDDZb/Bpeg=="
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.25",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.25.tgz",
      "integrity": "sha512-vNk6aEwybGtawWmy/PzwnGDOjCkLWSD2wqvjGGAgOAwCGWySYXfYoxt00IJkTF+8Lb57DwOb3Aa0o9CApepiYQ==",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@next/env": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-14.2.4.tgz",
      "integrity": "sha512-3EtkY5VDkuV2+lNmKlbkibIJxcO4oIHEhBWne6PaAp+76J9KoSsGvNikp6ivzAT8dhhBMYrm6op2pS1ApG0Hzg=="
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-14.2.4.tgz",
      "integrity": "sha512-AH3mO4JlFUqsYcwFUHb1wAKlebHU/Hv2u2kb1pAuRanDZ7pD/A/KPD98RHZmwsJpdHQwfEc/06mgpSzwrJYnNg==",
      "cpu": [
        "arm64"
      ],
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-14.2.4.tgz",
      "integrity": "sha512-QVadW73sWIO6E2VroyUjuAxhWLZWEpiFqHdZdoQ/AMpN9YWGuHV8t2rChr0ahy+irKX5mlDU7OY68k3n4tAZTg==",
      "cpu": [
        "x64"
      ],
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-14.2.4.tgz",
      "integrity": "sha512-KT6GUrb3oyCfcfJ+WliXuJnD6pCpZiosx2X3k66HLR+DMoilRb76LpWPGb4tZprawTtcnyrv75ElD6VncVamUQ==",
      "cpu": [
        "arm64"
      ],
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-14.2.4.tgz",
      "integrity": "sha512-Alv8/XGSs/ytwQcbCHwze1HmiIkIVhDHYLjczSVrf0Wi2MvKn/blt7+S6FJitj3yTlMwMxII1gIJ9WepI4aZ/A==",
      "cpu": [
        "arm64"
      ],
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-14.2.4.tgz",
      "integrity": "sha512-ze0ShQDBPCqxLImzw4sCdfnB3lRmN3qGMB2GWDRlq5Wqy4G36pxtNOo2usu/Nm9+V2Rh/QQnrRc2l94kYFXO6Q==",
      "cpu": [
        "x64"
      ],
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-14.2.4.tgz",
      "integrity": "sha512-8dwC0UJoc6fC7PX70csdaznVMNr16hQrTDAMPvLPloazlcaWfdPogq+UpZX6Drqb1OBlwowz8iG7WR0Tzk/diQ==",
      "cpu": [
        "x64"
      ],
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-14.2.4.tgz",
      "integrity": "sha512-jxyg67NbEWkDyvM+O8UDbPAyYRZqGLQDTPwvrBBeOSyVWW/jFQkQKQ70JDqDSYg1ZDdl+E3nkbFbq8xM8E9x8A==",
      "cpu": [
        "arm64"
      ],
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-ia32-msvc": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-ia32-msvc/-/swc-win32-ia32-msvc-14.2.4.tgz",
      "integrity": "sha512-twrmN753hjXRdcrZmZttb/m5xaCBFa48Dt3FbeEItpJArxriYDunWxJn+QFXdJ3hPkm4u7CKxncVvnmgQMY1ag==",
      "cpu": [
        "ia32"
      ],
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-14.2.4.tgz",
      "integrity": "sha512-tkLrjBzqFTP8DVrAAQmZelEahfR9OxWpFR++vAI9FBhCiIxtwHwBHC23SBHCTURBtwB4kc/x44imVOnkKGNVGg==",
      "cpu": [
        "x64"
      ],
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@pkgjs/parseargs": {
      "version": "0.11.0",
      "resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
      "integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
      "optional": true,
      "engines": {
        "node": ">=14"
      }
    },
    "node_modules/@radix-ui/number": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/number/-/number-1.0.1.tgz",
      "integrity": "sha512-T5gIdVO2mmPW3NNhjNgEP3cqMXjXL9UbO0BzWcXfvdBs+BohbQxvd/K5hSVKmn9/lbTdsQVKbUcP5WLCwvUbBg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      }
    },
    "node_modules/@radix-ui/primitive": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.0.1.tgz",
      "integrity": "sha512-yQ8oGX2GVsEYMWGxcovu1uGWPCxV5BFfeeYxqPmuAzUyLT9qmaMXSAhXpb0WrspIeqYzdJpkh2vHModJPgRIaw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      }
    },
    "node_modules/@radix-ui/react-accordion": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-accordion/-/react-accordion-1.1.2.tgz",
      "integrity": "sha512-fDG7jcoNKVjSK6yfmuAs0EnPDro0WMXIhMtXdTBWqEioVW206ku+4Lw07e+13lUkFkpoEQ2PdeMIAGpdqEAmDg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collapsible": "1.0.3",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-alert-dialog": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-alert-dialog/-/react-alert-dialog-1.0.5.tgz",
      "integrity": "sha512-OrVIOcZL0tl6xibeuGt5/+UxoT2N27KCFOPjFyfXMnchxSHZ/OW7cCX2nGlIYJrbHK/fczPcFzAwvNBB6XBNMA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-dialog": "1.0.5",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-slot": "1.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-arrow": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-arrow/-/react-arrow-1.0.3.tgz",
      "integrity": "sha512-wSP+pHsB/jQRaL6voubsQ/ZlrGBHHrOjmBnr19hxYgtS0WvAFwZhK2WP/YY5yF9uKECCEEDGxuLxq1NBK51wFA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-aspect-ratio": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-aspect-ratio/-/react-aspect-ratio-1.0.3.tgz",
      "integrity": "sha512-fXR5kbMan9oQqMuacfzlGG/SQMcmMlZ4wrvpckv8SgUulD0MMpspxJrxg/Gp/ISV3JfV1AeSWTYK9GvxA4ySwA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-avatar": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-avatar/-/react-avatar-1.0.4.tgz",
      "integrity": "sha512-kVK2K7ZD3wwj3qhle0ElXhOjbezIgyl2hVvgwfIdexL3rN6zJmy5AqqIf+D31lxVppdzV8CjAfZ6PklkmInZLw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-checkbox": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-checkbox/-/react-checkbox-1.0.4.tgz",
      "integrity": "sha512-CBuGQa52aAYnADZVt/KBQzXrwx6TqnlwtcIPGtVt5JkkzQwMOLJjPukimhfKEr4GQNd43C+djUh5Ikopj8pSLg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-previous": "1.0.1",
        "@radix-ui/react-use-size": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collapsible": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collapsible/-/react-collapsible-1.0.3.tgz",
      "integrity": "sha512-UBmVDkmR6IvDsloHVN+3rtx4Mi5TFvylYXpluuv0f37dtaz3H99bp8No0LGXRigVpl3UAT4l9j6bIchh42S/Gg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-collection": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.0.3.tgz",
      "integrity": "sha512-3SzW+0PW7yBBoQlT8wNcGtaxaD0XSu0uLUFgrtHY08Acx05TaHaOmVLR73c0j/cqpDy53KBMO7s0dx2wmOIDIA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-slot": "1.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-compose-refs": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.0.1.tgz",
      "integrity": "sha512-fDSBgd44FKHa1FRMU59qBMPFcl2PZE+2nmqunj+BWFyYYjnhIDWL2ItDs3rrbJDQOtzt5nIebLCQc4QRfz6LJw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.0.1.tgz",
      "integrity": "sha512-ebbrdFoYTcuZ0v4wG5tedGnp9tzcV8awzsxYph7gXUyvnNLuTIcCk1q17JEbnVhXAKG9oX3KtchwiMIAYp9NLg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context-menu": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context-menu/-/react-context-menu-2.1.5.tgz",
      "integrity": "sha512-R5XaDj06Xul1KGb+WP8qiOh7tKJNz2durpLBXAGZjSVtctcRFCuEvy2gtMwRJGePwQQE5nV77gs4FwRi8T+r2g==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-menu": "2.0.6",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dialog": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dialog/-/react-dialog-1.0.5.tgz",
      "integrity": "sha512-GjWJX/AUpB703eEBanuBnIWdIXg6NvJFCXcNlSZk4xdszCdhrJgBoUd1cGk67vFO+WdA2pfI/plOpqz/5GUP6Q==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-focus-guards": "1.0.1",
        "@radix-ui/react-focus-scope": "1.0.4",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-portal": "1.0.4",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-slot": "1.0.2",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "aria-hidden": "^1.1.1",
        "react-remove-scroll": "2.5.5"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-direction": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-direction/-/react-direction-1.0.1.tgz",
      "integrity": "sha512-RXcvnXgyvYvBEOhCBuddKecVkoMiI10Jcm5cTI7abJRAHYfFxeu+FBQs/DvdxSYucxR5mna0dNsL6QFlds5TMA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dismissable-layer": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.0.5.tgz",
      "integrity": "sha512-aJeDjQhywg9LBu2t/At58hCvr7pEm0o2Ke1x33B+MhjNmmZ17sy4KImo0KPLgsnc/zN7GPdce8Cnn0SWvwZO7g==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-escape-keydown": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dropdown-menu": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dropdown-menu/-/react-dropdown-menu-2.0.6.tgz",
      "integrity": "sha512-i6TuFOoWmLWq+M/eCLGd/bQ2HfAX1RJgvrBQ6AQLmzfvsLdefxbWu8G9zczcPFfcSPehz9GcpF6K9QYreFV8hA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-menu": "2.0.6",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-guards": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-guards/-/react-focus-guards-1.0.1.tgz",
      "integrity": "sha512-Rect2dWbQ8waGzhMavsIbmSVCgYxkXLxxR3ZvCX79JOglzdEy4JXMb98lq4hPxUbLr77nP0UOGf4rcMU+s1pUA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-scope": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.0.4.tgz",
      "integrity": "sha512-sL04Mgvf+FmyvZeYfNu1EPAaaxD+aw7cYeIB9L9Fvq8+urhltTRaEo5ysKOpHuKPclsZcSUMKlN05x4u+CINpA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-hover-card": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-hover-card/-/react-hover-card-1.0.7.tgz",
      "integrity": "sha512-OcUN2FU0YpmajD/qkph3XzMcK/NmSk9hGWnjV68p6QiZMgILugusgQwnLSDs3oFSJYGKf3Y49zgFedhGh04k9A==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-popper": "1.1.3",
        "@radix-ui/react-portal": "1.0.4",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-id": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.0.1.tgz",
      "integrity": "sha512-tI7sT/kqYp8p96yGWY1OAnLHrqDgzHefRBKQ2YAkBS5ja7QLcZ9Z/uY7bEjPUatf8RomoXM8/1sMj1IJaE5UzQ==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-use-layout-effect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-label": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-label/-/react-label-2.0.2.tgz",
      "integrity": "sha512-N5ehvlM7qoTLx7nWPodsPYPgMzA5WM8zZChQg8nyFJKnDO5WHdba1vv5/H6IO5LtJMfD2Q3wh1qHFGNtK0w3bQ==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menu": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menu/-/react-menu-2.0.6.tgz",
      "integrity": "sha512-BVkFLS+bUC8HcImkRKPSiVumA1VPOOEC5WBMiT+QAVsPzW1FJzI9KnqgGxVDPBcql5xXrHkD3JOVoXWEXD8SYA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-focus-guards": "1.0.1",
        "@radix-ui/react-focus-scope": "1.0.4",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-popper": "1.1.3",
        "@radix-ui/react-portal": "1.0.4",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-roving-focus": "1.0.4",
        "@radix-ui/react-slot": "1.0.2",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "aria-hidden": "^1.1.1",
        "react-remove-scroll": "2.5.5"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-menubar": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-menubar/-/react-menubar-1.0.4.tgz",
      "integrity": "sha512-bHgUo9gayKZfaQcWSSLr++LyS0rgh+MvD89DE4fJ6TkGHvjHgPaBZf44hdka7ogOxIOdj9163J+5xL2Dn4qzzg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-menu": "2.0.6",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-roving-focus": "1.0.4",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-navigation-menu": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-navigation-menu/-/react-navigation-menu-1.1.4.tgz",
      "integrity": "sha512-Cc+seCS3PmWmjI51ufGG7zp1cAAIRqHVw7C9LOA2TZ+R4hG6rDvHcTqIsEEFLmZO3zNVH72jOOE7kKNy8W+RtA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1",
        "@radix-ui/react-use-previous": "1.0.1",
        "@radix-ui/react-visually-hidden": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popover": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popover/-/react-popover-1.0.7.tgz",
      "integrity": "sha512-shtvVnlsxT6faMnK/a7n0wptwBD23xc1Z5mdrtKLwVEfsEMXodS0r5s0/g5P0hX//EKYZS2sxUjqfzlg52ZSnQ==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-focus-guards": "1.0.1",
        "@radix-ui/react-focus-scope": "1.0.4",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-popper": "1.1.3",
        "@radix-ui/react-portal": "1.0.4",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-slot": "1.0.2",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "aria-hidden": "^1.1.1",
        "react-remove-scroll": "2.5.5"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-popper": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-popper/-/react-popper-1.1.3.tgz",
      "integrity": "sha512-cKpopj/5RHZWjrbF2846jBNacjQVwkP068DfmgrNJXpvVWrOvlAmE9xSiy5OqeE+Gi8D9fP+oDhUnPqNMY8/5w==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@floating-ui/react-dom": "^2.0.0",
        "@radix-ui/react-arrow": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1",
        "@radix-ui/react-use-rect": "1.0.1",
        "@radix-ui/react-use-size": "1.0.1",
        "@radix-ui/rect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-portal": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.0.4.tgz",
      "integrity": "sha512-Qki+C/EuGUVCQTOTD5vzJzJuMUlewbzuKyUy+/iHM2uwGiru9gZeBJtHAPKAEkB5KWGi9mP/CHKcY0wt1aW45Q==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-presence": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.0.1.tgz",
      "integrity": "sha512-UXLW4UAbIY5ZjcvzjfRFo5gxva8QirC9hF7wRE4U5gz+TP0DbRk+//qyuAQ1McDxBt1xNMBTaciFGvEmJvAZCg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-1.0.3.tgz",
      "integrity": "sha512-yi58uVyoAcK/Nq1inRY56ZSjKypBNKTa/1mcL8qdl6oJeEaDbOldlzrGn7P6Q3Id5d+SYNGc5AJgc4vGhjs5+g==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-slot": "1.0.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-progress": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-progress/-/react-progress-1.0.3.tgz",
      "integrity": "sha512-5G6Om/tYSxjSeEdrb1VfKkfZfn/1IlPWd731h2RfPuSbIfNUgfqAwbKfJCg/PP6nuUCTrYzalwHSpSinoWoCag==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-radio-group": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-radio-group/-/react-radio-group-1.1.3.tgz",
      "integrity": "sha512-x+yELayyefNeKeTx4fjK6j99Fs6c4qKm3aY38G3swQVTN6xMpsrbigC0uHs2L//g8q4qR7qOcww8430jJmi2ag==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-roving-focus": "1.0.4",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-previous": "1.0.1",
        "@radix-ui/react-use-size": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-roving-focus": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-roving-focus/-/react-roving-focus-1.0.4.tgz",
      "integrity": "sha512-2mUg5Mgcu001VkGy+FfzZyzbmuUWzgWkj3rvv4yu+mLw03+mTzbxZHvfcGyFp2b8EkQeMkpRQ5FiA2Vr2O6TeQ==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-scroll-area": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-scroll-area/-/react-scroll-area-1.0.5.tgz",
      "integrity": "sha512-b6PAgH4GQf9QEn8zbT2XUHpW5z8BzqEc7Kl11TwDrvuTrxlkcjTD5qa/bxgKr+nmuXKu4L/W5UZ4mlP/VG/5Gw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/number": "1.0.1",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-select": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-select/-/react-select-2.0.0.tgz",
      "integrity": "sha512-RH5b7af4oHtkcHS7pG6Sgv5rk5Wxa7XI8W5gvB1N/yiuDGZxko1ynvOiVhFM7Cis2A8zxF9bTOUVbRDzPepe6w==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/number": "1.0.1",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-focus-guards": "1.0.1",
        "@radix-ui/react-focus-scope": "1.0.4",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-popper": "1.1.3",
        "@radix-ui/react-portal": "1.0.4",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-slot": "1.0.2",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1",
        "@radix-ui/react-use-previous": "1.0.1",
        "@radix-ui/react-visually-hidden": "1.0.3",
        "aria-hidden": "^1.1.1",
        "react-remove-scroll": "2.5.5"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-separator": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-separator/-/react-separator-1.0.3.tgz",
      "integrity": "sha512-itYmTy/kokS21aiV5+Z56MZB54KrhPgn6eHDKkFeOLR34HMN2s8PaN47qZZAGnvupcjxHaFZnW4pQEh0BvvVuw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slider": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slider/-/react-slider-1.1.2.tgz",
      "integrity": "sha512-NKs15MJylfzVsCagVSWKhGGLNR1W9qWs+HtgbmjjVUB3B9+lb3PYoXxVju3kOrpf0VKyVCtZp+iTwVoqpa1Chw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/number": "1.0.1",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1",
        "@radix-ui/react-use-previous": "1.0.1",
        "@radix-ui/react-use-size": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slot": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.0.2.tgz",
      "integrity": "sha512-YeTpuq4deV+6DusvVUW4ivBgnkHwECUu0BiN43L5UCDFgdhsRUWAghhTF5MbvNTPzmiFOx90asDSUjWuCNapwg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-compose-refs": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-switch": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-switch/-/react-switch-1.0.3.tgz",
      "integrity": "sha512-mxm87F88HyHztsI7N+ZUmEoARGkC22YVW5CaC+Byc+HRpuvCrOBPTAnXgf+tZ/7i0Sg/eOePGdMhUKhPaQEqow==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-previous": "1.0.1",
        "@radix-ui/react-use-size": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tabs": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-tabs/-/react-tabs-1.0.4.tgz",
      "integrity": "sha512-egZfYY/+wRNCflXNHx+dePvnz9FbmssDTJBtgRfDY7e8SE5oIo3Py2eCB1ckAbh1Q7cQ/6yJZThJ++sgbxibog==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-roving-focus": "1.0.4",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toast": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toast/-/react-toast-1.1.5.tgz",
      "integrity": "sha512-fRLn227WHIBRSzuRzGJ8W+5YALxofH23y0MlPLddaIpLpCDqdE0NZlS2NRQDRiptfxDeeCjgFIpexB1/zkxDlw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-collection": "1.0.3",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-portal": "1.0.4",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-callback-ref": "1.0.1",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-use-layout-effect": "1.0.1",
        "@radix-ui/react-visually-hidden": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toggle": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toggle/-/react-toggle-1.0.3.tgz",
      "integrity": "sha512-Pkqg3+Bc98ftZGsl60CLANXQBBQ4W3mTFS9EJvNxKMZ7magklKV69/id1mlAlOFDDfHvlCms0fx8fA4CMKDJHg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-toggle-group": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-toggle-group/-/react-toggle-group-1.0.4.tgz",
      "integrity": "sha512-Uaj/M/cMyiyT9Bx6fOZO0SAG4Cls0GptBWiBmBxofmDbNVnYYoyRWj/2M/6VCi/7qcXFWnHhRUfdfZFvvkuu8A==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-direction": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-roving-focus": "1.0.4",
        "@radix-ui/react-toggle": "1.0.3",
        "@radix-ui/react-use-controllable-state": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-tooltip": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-tooltip/-/react-tooltip-1.0.7.tgz",
      "integrity": "sha512-lPh5iKNFVQ/jav/j6ZrWq3blfDJ0OH9R6FlNUHPMqdLuQ9vwDgFsRxvl8b7Asuy5c8xmoojHUxKHQSOAvMHxyw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/primitive": "1.0.1",
        "@radix-ui/react-compose-refs": "1.0.1",
        "@radix-ui/react-context": "1.0.1",
        "@radix-ui/react-dismissable-layer": "1.0.5",
        "@radix-ui/react-id": "1.0.1",
        "@radix-ui/react-popper": "1.1.3",
        "@radix-ui/react-portal": "1.0.4",
        "@radix-ui/react-presence": "1.0.1",
        "@radix-ui/react-primitive": "1.0.3",
        "@radix-ui/react-slot": "1.0.2",
        "@radix-ui/react-use-controllable-state": "1.0.1",
        "@radix-ui/react-visually-hidden": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-callback-ref": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.0.1.tgz",
      "integrity": "sha512-D94LjX4Sp0xJFVaoQOd3OO9k7tpBYNOXdVhkltUbGv2Qb9OXdrg/CpsjlZv7ia14Sylv398LswWBVVu5nqKzAQ==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-controllable-state": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.0.1.tgz",
      "integrity": "sha512-Svl5GY5FQeN758fWKrjM6Qb7asvXeiZltlT4U2gVfl8Gx5UAv2sMR0LWo8yhsIZh2oQ0eFdZ59aoOOMV7b47VA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-use-callback-ref": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-escape-keydown": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-escape-keydown/-/react-use-escape-keydown-1.0.3.tgz",
      "integrity": "sha512-vyL82j40hcFicA+M4Ex7hVkB9vHgSse1ZWomAqV2Je3RleKGO5iM8KMOEtfoSB0PnIelMd2lATjTGMYqN5ylTg==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-use-callback-ref": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-layout-effect": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.0.1.tgz",
      "integrity": "sha512-v/5RegiJWYdoCvMnITBkNNx6bCj20fiaJnWtRkU18yITptraXjffz5Qbn05uOiQnOvi+dbkznkoaMltz1GnszQ==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-previous": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-previous/-/react-use-previous-1.0.1.tgz",
      "integrity": "sha512-cV5La9DPwiQ7S0gf/0qiD6YgNqM5Fk97Kdrlc5yBcrF3jyEZQwm7vYFqMo4IfeHgJXsRaMvLABFtd0OVEmZhDw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-rect": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-rect/-/react-use-rect-1.0.1.tgz",
      "integrity": "sha512-Cq5DLuSiuYVKNU8orzJMbl15TXilTnJKUCltMVQg53BQOF1/C5toAaGrowkgksdBQ9H+SRL23g0HDmg9tvmxXw==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/rect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-size": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-size/-/react-use-size-1.0.1.tgz",
      "integrity": "sha512-ibay+VqrgcaI6veAojjofPATwledXiSmX+C0KrBk/xgpX9rBzPV3OsfwlhQdUOFbh+LKQorLYT+xTXW9V8yd0g==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-use-layout-effect": "1.0.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-visually-hidden": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-visually-hidden/-/react-visually-hidden-1.0.3.tgz",
      "integrity": "sha512-D4w41yN5YRKtu464TLnByKzMDG/JlMPHtfZgQAu9v6mNakUqGUI9vUrfQKz8NK41VMm/xbZbh76NUTVtIYqOMA==",
      "dependencies": {
        "@babel/runtime": "^7.13.10",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/rect": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/rect/-/rect-1.0.1.tgz",
      "integrity": "sha512-fyrgCaedtvMg9NK3en0pnOYJdtfwxUcNolezkNPUsoX57X8oQk+NkqcvzHXD2uKNij6GXmWU9NDru2IWjrO4BQ==",
      "dependencies": {
        "@babel/runtime": "^7.13.10"
      }
    },
    "node_modules/@swc/counter": {
      "version": "0.1.3",
      "resolved": "https://registry.npmjs.org/@swc/counter/-/counter-0.1.3.tgz",
      "integrity": "sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ=="
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.5",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.5.tgz",
      "integrity": "sha512-KGYxvIOXcceOAbEk4bi/dVLEK9z8sZ0uBB3Il5b1rhfClSpcX0yfRO0KmTkqR2cnQDymwLB+25ZyMzICg/cm/A==",
      "dependencies": {
        "@swc/counter": "^0.1.3",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@tanstack/query-core": {
      "version": "5.45.0",
      "resolved": "https://registry.npmjs.org/@tanstack/query-core/-/query-core-5.45.0.tgz",
      "integrity": "sha512-RVfIZQmFUTdjhSAAblvueimfngYyfN6HlwaJUPK71PKd7yi43Vs1S/rdimmZedPWX/WGppcq/U1HOj7O7FwYxw==",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      }
    },
    "node_modules/@tanstack/react-query": {
      "version": "5.45.0",
      "resolved": "https://registry.npmjs.org/@tanstack/react-query/-/react-query-5.45.0.tgz",
      "integrity": "sha512-y272cKRJp1BvehrWG4ashOBuqBj1Qm2O6fgYJ9LYSHrLdsCXl74GbSVjUQTReUdHuRIl9cEOoyPa6HYag400lw==",
      "dependencies": {
        "@tanstack/query-core": "5.45.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/tannerlinsley"
      },
      "peerDependencies": {
        "react": "^18.0.0"
      }
    },
    "node_modules/@types/lodash": {
      "version": "4.17.5",
      "resolved": "https://registry.npmjs.org/@types/lodash/-/lodash-4.17.5.tgz",
      "integrity": "sha512-MBIOHVZqVqgfro1euRDWX7OO0fBVUUMrN6Pwm8LQsz8cWhEpihlvR70ENj3f40j58TNxZaWv2ndSkInykNBBJw==",
      "dev": true
    },
    "node_modules/@types/node": {
      "version": "20.14.2",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.14.2.tgz",
      "integrity": "sha512-xyu6WAMVwv6AKFLB+e/7ySZVr/0zLCzOa7rSpq6jNwpqOrUbcACDWC+53d4n2QHOnDou0fbIsg8wZu/sxrnI4Q==",
      "dependencies": {
        "undici-types": "~5.26.4"
      }
    },
    "node_modules/@types/node-fetch": {
      "version": "2.6.11",
      "resolved": "https://registry.npmjs.org/@types/node-fetch/-/node-fetch-2.6.11.tgz",
      "integrity": "sha512-24xFj9R5+rfQJLRyM56qh+wnVSYhyXC2tkoBndtY0U+vubqNsYXGjufB2nn8Q6gt0LrARwL6UBtMCSVCwl4B1g==",
      "dependencies": {
        "@types/node": "*",
        "form-data": "^4.0.0"
      }
    },
    "node_modules/@types/prop-types": {
      "version": "15.7.12",
      "resolved": "https://registry.npmjs.org/@types/prop-types/-/prop-types-15.7.12.tgz",
      "integrity": "sha512-5zvhXYtRNRluoE/jAp4GVsSduVUzNWKkOZrCDBWYtE7biZywwdC2AcEzg+cSMLFRfVgeAFqpfNabiPjxFddV1Q==",
      "devOptional": true
    },
    "node_modules/@types/react": {
      "version": "18.3.3",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-18.3.3.tgz",
      "integrity": "sha512-hti/R0pS0q1/xx+TsI73XIqk26eBsISZ2R0wUijXIngRK9R/e7Xw/cXVxQK7R5JjW+SV4zGcn5hXjudkN/pLIw==",
      "devOptional": true,
      "dependencies": {
        "@types/prop-types": "*",
        "csstype": "^3.0.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "18.3.0",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-18.3.0.tgz",
      "integrity": "sha512-EhwApuTmMBmXuFOikhQLIBUn6uFg81SwLMOAUgodJF14SOBOCMdU04gDoYi0WOJJHD144TL32z4yDqCW3dnkQg==",
      "devOptional": true,
      "dependencies": {
        "@types/react": "*"
      }
    },
    "node_modules/@upstash/core-analytics": {
      "version": "0.0.9",
      "resolved": "https://registry.npmjs.org/@upstash/core-analytics/-/core-analytics-0.0.9.tgz",
      "integrity": "sha512-9NXXxZ5y1/A/zqKLlVT7NsAWSggJfOjB0hG6Ffx29b4jbzHOiQVWB55h5+j2clT9Ib+mNPXn0iB5zN3aWLkICw==",
      "dependencies": {
        "@upstash/redis": "^1.28.3"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/@upstash/ratelimit": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@upstash/ratelimit/-/ratelimit-1.2.1.tgz",
      "integrity": "sha512-o01lV1yFS5Fzj5KONZmNyVch/Qrlj785B2ob+kStUmxn8F6xXk7IHTQqVcHE+Ce3CmT/qQIwvMxDZftyJ5wYpQ==",
      "dependencies": {
        "@upstash/core-analytics": "^0.0.9"
      }
    },
    "node_modules/@upstash/redis": {
      "version": "1.31.5",
      "resolved": "https://registry.npmjs.org/@upstash/redis/-/redis-1.31.5.tgz",
      "integrity": "sha512-2MatqeqftroSJ9Q+pqbyGAIwXX6KEPtUTUna2c/fq09h12ffwvltDTgfppeF+NzJo/SyZfHY8e1RoflduMbz1A==",
      "dependencies": {
        "crypto-js": "^4.2.0"
      }
    },
    "node_modules/@vercel/kv": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/@vercel/kv/-/kv-2.0.0.tgz",
      "integrity": "sha512-zdVrhbzZBYo5d1Hfn4bKtqCeKf0FuzW8rSHauzQVMUgv1+1JOwof2mWcBuI+YMJy8s0G0oqAUfQ7HgUDzb8EbA==",
      "dependencies": {
        "@upstash/redis": "^1.31.3"
      },
      "engines": {
        "node": ">=14.6"
      }
    },
    "node_modules/abort-controller": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/abort-controller/-/abort-controller-3.0.0.tgz",
      "integrity": "sha512-h8lQ8tacZYnR3vNQTgibj+tODHI5/+l06Au2Pcriv/Gmet0eaj4TwWH41sO9wnHDiQsEj19q0drzdWdeAHtweg==",
      "dependencies": {
        "event-target-shim": "^5.0.0"
      },
      "engines": {
        "node": ">=6.5"
      }
    },
    "node_modules/agentkeepalive": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/agentkeepalive/-/agentkeepalive-4.5.0.tgz",
      "integrity": "sha512-5GG/5IbQQpC9FpkRGsSvZI5QYeSCzlJHdpBQntCsuTOxhKD8lqKhrleg2Yi7yvMIf82Ycmmqln9U8V9qwEiJew==",
      "dependencies": {
        "humanize-ms": "^1.2.1"
      },
      "engines": {
        "node": ">= 8.0.0"
      }
    },
    "node_modules/ansi-regex": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.0.1.tgz",
      "integrity": "sha512-n5M855fKb2SsfMIiFFoVrABHJC8QtHwVx+mHWP3QcEqBHYienj5dHSgjbxtC0WEZXYt4wcD6zrQElDPhFuZgfA==",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "6.2.1",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.1.tgz",
      "integrity": "sha512-bN798gFfQX+viw3R7yrGWRqnrN2oRkEkUjjl4JNn4E8GxxbjtG3FbrEIIY3l8/hrwUwIeCZvi4QuOTP4MErVug==",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A=="
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg=="
    },
    "node_modules/aria-hidden": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/aria-hidden/-/aria-hidden-1.2.4.tgz",
      "integrity": "sha512-y+CcFFwelSXpLZk/7fMB2mUbGtX9lKycf1MWJ7CaTIERyitVlyQx6C+sxcROU2BAJ24OiZyK+8wj2i8AlBoS3A==",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q=="
    },
    "node_modules/attr-accept": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/attr-accept/-/attr-accept-2.2.2.tgz",
      "integrity": "sha512-7prDjvt9HmqiZ0cl5CRjtS84sEyhsHP2coDkaZKRKVfCDo9s7iw7ChVmar78Gu9pC4SoR/28wFu/G5JJhTnqEg==",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/automation-events": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/automation-events/-/automation-events-7.0.5.tgz",
      "integrity": "sha512-Ni6vhZg0mKmVlew1kxWAzWL7QY1LYDdoYgp6yF9OHeskDrjyJp2SqoKoPQYeiMYjeIlbSpnxXm/JI55VcmX5Wg==",
      "dev": true,
      "dependencies": {
        "@babel/runtime": "^7.24.5",
        "tslib": "^2.6.2"
      },
      "engines": {
        "node": ">=18.2.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw=="
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/brace-expansion": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.1.tgz",
      "integrity": "sha512-XnAIvQ8eM+kC6aULx6wuQiwVsnzsi9d3WxzV3FpWTGA19F621kwdbsAcFKXgKUHZWsy+mY6iL1sHTxWEFCytDA==",
      "dependencies": {
        "balanced-match": "^1.0.0"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001634",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001634.tgz",
      "integrity": "sha512-fbBYXQ9q3+yp1q1gBk86tOFs4pyn/yxFm5ZNP18OXJDfA3txImOY9PhfxVggZ4vRHDqoU8NrKU81eN0OtzOgRA==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ]
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.0",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.0.tgz",
      "integrity": "sha512-jFI8IQw4hczaL4ALINxqLEXQbWcNjoSkloa4IaufXCJr6QawJyw7tuRysRsrE8w2p/4gGaxKIt/hX3qz/IbD1A==",
      "dependencies": {
        "clsx": "2.0.0"
      },
      "funding": {
        "url": "https://joebell.co.uk"
      }
    },
    "node_modules/class-variance-authority/node_modules/clsx": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.0.0.tgz",
      "integrity": "sha512-rQ1+kcj+ttHG0MKVGBUXwayCCF1oh39BF5COIpRzuCEv8Mwjv0XucrI2ExNTOn9IlLifGClWQcU9BrZORvtw6Q==",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA=="
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/cmdk": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/cmdk/-/cmdk-1.0.0.tgz",
      "integrity": "sha512-gDzVf0a09TvoJ5jnuPvygTB77+XdOSwEmJ88L6XPFPlv7T3RxbP9jgenfylrAMD0+Le1aO0nVjQUzl2g+vjz5Q==",
      "dependencies": {
        "@radix-ui/react-dialog": "1.0.5",
        "@radix-ui/react-primitive": "1.0.3"
      },
      "peerDependencies": {
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      }
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA=="
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.3.tgz",
      "integrity": "sha512-iRDPJKUPVEND7dHPO8rkbOnPpyDygcDFtWjpeWNCgy8WP2rXcxXL8TskReQl6OrB2G7+UJrags1q15Fudc7G6w==",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/crypto-js": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/crypto-js/-/crypto-js-4.2.0.tgz",
      "integrity": "sha512-KALDyEYgpY+Rlob/iriUtjV6d5Eq+Y191A5g4UqLAi8CyGP9N1+FdVbkc1SxKc2r4YAYqG8JzO2KGL+AizD70Q=="
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.3.tgz",
      "integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
      "devOptional": true
    },
    "node_modules/date-fns": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/date-fns/-/date-fns-3.6.0.tgz",
      "integrity": "sha512-fRHTG8g/Gif+kSh50gaGEdToemgfj74aRX3swtiouboip5JDLAyDE9F11nHMIcvOaXeOC6D7SpNhi7uFyB7Uww==",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/kossnocorp"
      }
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/detect-node-es": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
      "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ=="
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw=="
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA=="
    },
    "node_modules/eastasianwidth": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
      "integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA=="
    },
    "node_modules/embla-carousel": {
      "version": "8.1.5",
      "resolved": "https://registry.npmjs.org/embla-carousel/-/embla-carousel-8.1.5.tgz",
      "integrity": "sha512-R6xTf7cNdR2UTNM6/yUPZlJFRmZSogMiRjJ5vXHO65II5MoUlrVYUAP0fHQei/py82Vf15lj+WI+QdhnzBxA2g=="
    },
    "node_modules/embla-carousel-react": {
      "version": "8.1.5",
      "resolved": "https://registry.npmjs.org/embla-carousel-react/-/embla-carousel-react-8.1.5.tgz",
      "integrity": "sha512-xFmfxgJd7mpWDHQ4iyK1Qs+5BTTwu4bkn+mSROKiUH9nKpPHTeilQ+rpeQDCHRrAPeshD67aBk0/p6FxWxXsng==",
      "dependencies": {
        "embla-carousel": "8.1.5",
        "embla-carousel-reactive-utils": "8.1.5"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.1 || ^18.0.0"
      }
    },
    "node_modules/embla-carousel-reactive-utils": {
      "version": "8.1.5",
      "resolved": "https://registry.npmjs.org/embla-carousel-reactive-utils/-/embla-carousel-reactive-utils-8.1.5.tgz",
      "integrity": "sha512-76uZTrSaEGGta+qpiGkMFlLK0I7N04TdjZ2obrBhyggYIFDWlxk1CriIEmt2lisLNsa1IYXM85kr863JoCMSyg==",
      "peerDependencies": {
        "embla-carousel": "8.1.5"
      }
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg=="
    },
    "node_modules/event-target-shim": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/event-target-shim/-/event-target-shim-5.0.1.tgz",
      "integrity": "sha512-i/2XbnSz/uxRCU6+NdVJgKWDTM427+MqYbkQzD321DuCQJUqOuJKIA0IM2+W2xtYHdKOmZ4dR6fExsd4SXL+WQ==",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.2.tgz",
      "integrity": "sha512-oX2ruAFQwf/Orj8m737Y5adxDQO0LAB7/S5MnxCdTNDd4p6BsyIVsv9JQsATbTSq8KHRpLwIHbVlUNatxd+1Ow==",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.17.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.17.1.tgz",
      "integrity": "sha512-sRVD3lWVIXWg6By68ZN7vho9a1pQcN/WBFaAAsDDFzlJjvoGx0P8z7V1t72grFJfJhu3YPZBuu25f7Kaw2jN1w==",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fflate": {
      "version": "0.4.8",
      "resolved": "https://registry.npmjs.org/fflate/-/fflate-0.4.8.tgz",
      "integrity": "sha512-FJqqoDBR00Mdj9ppamLa/Y7vxm+PRmNWA67N846RvsoYVMKB4q3y/de5PA7gUmRMYK/8CMz2GDZQmCRN1wBcWA=="
    },
    "node_modules/file-selector": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/file-selector/-/file-selector-0.6.0.tgz",
      "integrity": "sha512-QlZ5yJC0VxHxQQsQhXvBaC7VRJ2uaxTf+Tfpu4Z/OcVQJVpZO+DGU0rkoVW5ce2SccxugvpBJoMvUs59iILYdw==",
      "dependencies": {
        "tslib": "^2.4.0"
      },
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/foreground-child": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.2.1.tgz",
      "integrity": "sha512-PXUUyLqrR2XCWICfv6ukppP96sdFwWbNEnfEMt7jNsISjMsvaLNinAHNDYyvkyU+SZG2BTSbT5NjG+vZslfGTA==",
      "dependencies": {
        "cross-spawn": "^7.0.0",
        "signal-exit": "^4.0.1"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/form-data": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-4.0.0.tgz",
      "integrity": "sha512-ETEklSGi5t0QMZuiXoA/Q6vcnxcLQP5vdugSpuAyi6SVGi2clPPp+xgEhuMaHC+zGgn31Kd235W35f7Hykkaww==",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "mime-types": "^2.1.12"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/form-data-encoder": {
      "version": "1.7.2",
      "resolved": "https://registry.npmjs.org/form-data-encoder/-/form-data-encoder-1.7.2.tgz",
      "integrity": "sha512-qfqtYan3rxrnCk1VYaA4H+Ms9xdpPqvLZa6xmMgFvhO32x7/3J/ExcTd6qpxM0vH2GdMI+poehyBZvqfMTto8A=="
    },
    "node_modules/formdata-node": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/formdata-node/-/formdata-node-4.4.1.tgz",
      "integrity": "sha512-0iirZp3uVDjVGt9p49aTaqjk84TrglENEDuqfdlZQ1roC9CWlPk6Avf8EEnZNcAqPonwkG35x4n3ww/1THYAeQ==",
      "dependencies": {
        "node-domexception": "1.0.0",
        "web-streams-polyfill": "4.0.0-beta.3"
      },
      "engines": {
        "node": ">= 12.20"
      }
    },
    "node_modules/formdata-node/node_modules/web-streams-polyfill": {
      "version": "4.0.0-beta.3",
      "resolved": "https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-4.0.0-beta.3.tgz",
      "integrity": "sha512-QW95TCTaHmsYfHDybGMwO5IJIM93I/6vTRk+daHTWFPhwh+C8Cg7j7XyKrwrj8Ib6vYXe0ocYNrmzY4xAAN6ug==",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/framer-motion": {
      "version": "11.2.10",
      "resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-11.2.10.tgz",
      "integrity": "sha512-/gr3PLZUVFCc86a9MqCUboVrALscrdluzTb3yew+2/qKBU8CX6nzs918/SRBRCqaPbx0TZP10CB6yFgK2C5cYQ==",
      "dependencies": {
        "tslib": "^2.4.0"
      },
      "peerDependencies": {
        "@emotion/is-prop-valid": "*",
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      },
      "peerDependenciesMeta": {
        "@emotion/is-prop-valid": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "hasInstallScript": true,
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/geist": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/geist/-/geist-1.3.0.tgz",
      "integrity": "sha512-IoGBfcqVEYB4bEwsfHd35jF4+X9LHRPYZymHL4YOltHSs9LJa24DYs1Z7rEMQ/lsEvaAIc61Y9aUxgcJaQ8lrg==",
      "peerDependencies": {
        "next": ">=13.2.0 <15.0.0-0"
      }
    },
    "node_modules/get-nonce": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
      "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/glob": {
      "version": "10.4.1",
      "resolved": "https://registry.npmjs.org/glob/-/glob-10.4.1.tgz",
      "integrity": "sha512-2jelhlq3E4ho74ZyVLN03oKdAZVUa6UDZzFLVH1H7dnoax+y9qyaq8zBkfDIggjniU19z0wU18y16jMB2eyVIw==",
      "dependencies": {
        "foreground-child": "^3.1.0",
        "jackspeak": "^3.1.2",
        "minimatch": "^9.0.4",
        "minipass": "^7.1.2",
        "path-scurry": "^1.11.1"
      },
      "bin": {
        "glob": "dist/esm/bin.mjs"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ=="
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/humanize-ms": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/humanize-ms/-/humanize-ms-1.2.1.tgz",
      "integrity": "sha512-Fl70vYtsAFb/C06PTS9dZBo7ihau+Tu/DNCk/OyHhea07S+aeMWpFFkUaXRa8fI+ScZbEI8dfSxwY7gxZ9SAVQ==",
      "dependencies": {
        "ms": "^2.0.0"
      }
    },
    "node_modules/input-otp": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/input-otp/-/input-otp-1.2.4.tgz",
      "integrity": "sha512-md6rhmD+zmMnUh5crQNSQxq3keBRYvE3odbr4Qb9g2NWzQv9azi+t1a3X4TBTbh98fsGHgEEJlzbe1q860uGCA==",
      "peerDependencies": {
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      }
    },
    "node_modules/invariant": {
      "version": "2.2.4",
      "resolved": "https://registry.npmjs.org/invariant/-/invariant-2.2.4.tgz",
      "integrity": "sha512-phJfQVBuaJM5raOpJjSfkiD6BpbCE4Ns//LaXl6wGYtUBY83nWS6Rf9tXm2e8VaK60JEjYldbPif/A2B1C2gNA==",
      "dependencies": {
        "loose-envify": "^1.0.0"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.13.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.13.1.tgz",
      "integrity": "sha512-hHrIjvZsftOsvKSn2TRYl63zvxsgE0K+0mYMoH6gD4omR5IWB2KynivBQczo3+wF1cCkjzvptnI9Q0sPU66ilw==",
      "dependencies": {
        "hasown": "^2.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw=="
    },
    "node_modules/jackspeak": {
      "version": "3.4.0",
      "resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-3.4.0.tgz",
      "integrity": "sha512-JVYhQnN59LVPFCEcVa2C3CrEKYacvjRfqIQl+h8oi91aLYQVWRYbxjPcv1bUiUy/kLmQaANrYfNMCO3kuEDHfw==",
      "dependencies": {
        "@isaacs/cliui": "^8.0.2"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      },
      "optionalDependencies": {
        "@pkgjs/parseargs": "^0.11.0"
      }
    },
    "node_modules/jiti": {
      "version": "1.21.6",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.6.tgz",
      "integrity": "sha512-2yTgeWTWzMWkHu6Jp9NKgePDaYHbntiwvYuuJLbbN9vl7DC9DvXKOB2BC3ZZ92D3cvV/aflH0osDfwpHepQ53w==",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ=="
    },
    "node_modules/lilconfig": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-2.1.0.tgz",
      "integrity": "sha512-utWOt/GHzuUxnLKxB6dk81RoOeoNeHgbrXiuGk4yyF5qlRz+iIVWu56E2fqGHFrXz0QNUhLB/8nKqvRH66JKGQ==",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg=="
    },
    "node_modules/lodash": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.21.tgz",
      "integrity": "sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg=="
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "10.2.2",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.2.2.tgz",
      "integrity": "sha512-9hp3Vp2/hFQUiIwKo8XCeFVnrg8Pk3TYNPIR7tJADKi5YfcF7vEaK7avFHTlSy3kOKYaJQaalfEo6YuXdceBOQ==",
      "engines": {
        "node": "14 || >=16.14"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.395.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.395.0.tgz",
      "integrity": "sha512-6hzdNH5723A4FLaYZWpK50iyZH8iS2Jq5zuPRRotOFkhu6kxxJiebVdJ72tCR5XkiIeYFOU5NUawFZOac+VeYw==",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.7.tgz",
      "integrity": "sha512-LPP/3KorzCwBxfeUuZmaR6bG2kdeHSbe0P2tY3FLRU4vYrjYz5hI4QZwV0njUx3jeuKe67YukQ1LSPZBKDqO/Q==",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/minimatch": {
      "version": "9.0.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.4.tgz",
      "integrity": "sha512-KqWh+VchfxcMNRAJjj2tnsSJdNbHsVgnkBhTNrW7AjVo6OvLtxw8zfT9oLw1JSohlFzJ8jCoTgaoXvJ+kHt6fw==",
      "dependencies": {
        "brace-expansion": "^2.0.1"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/minipass": {
      "version": "7.1.2",
      "resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.2.tgz",
      "integrity": "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==",
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/mobx": {
      "version": "6.12.4",
      "resolved": "https://registry.npmjs.org/mobx/-/mobx-6.12.4.tgz",
      "integrity": "sha512-uIymg89x+HmItX1p3MG+d09irn2k63J6biftZ5Ok+UpNojS1I3NJPLfcmJT9ANnUltNlHi+HQqrVyxiAN8ISYg==",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mobx"
      }
    },
    "node_modules/mobx-react": {
      "version": "9.1.1",
      "resolved": "https://registry.npmjs.org/mobx-react/-/mobx-react-9.1.1.tgz",
      "integrity": "sha512-gVV7AdSrAAxqXOJ2bAbGa5TkPqvITSzaPiiEkzpW4rRsMhSec7C2NBCJYILADHKp2tzOAIETGRsIY0UaCV5aEw==",
      "dependencies": {
        "mobx-react-lite": "^4.0.7"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mobx"
      },
      "peerDependencies": {
        "mobx": "^6.9.0",
        "react": "^16.8.0 || ^17 || ^18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        },
        "react-native": {
          "optional": true
        }
      }
    },
    "node_modules/mobx-react-lite": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/mobx-react-lite/-/mobx-react-lite-4.0.7.tgz",
      "integrity": "sha512-RjwdseshK9Mg8On5tyJZHtGD+J78ZnCnRaxeQDSiciKVQDUbfZcXhmld0VMxAwvcTnPEHZySGGewm467Fcpreg==",
      "dependencies": {
        "use-sync-external-store": "^1.2.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mobx"
      },
      "peerDependencies": {
        "mobx": "^6.9.0",
        "react": "^16.8.0 || ^17 || ^18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        },
        "react-native": {
          "optional": true
        }
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA=="
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.7",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.7.tgz",
      "integrity": "sha512-eSRppjcPIatRIMC1U6UngP8XFcz8MQWGQdt1MTBQ7NaAmvXDfvNxbvWV3x2y6CdEUciCSsDHDQZbhYaB8QEo2g==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/next": {
      "version": "14.2.4",
      "resolved": "https://registry.npmjs.org/next/-/next-14.2.4.tgz",
      "integrity": "sha512-R8/V7vugY+822rsQGQCjoLhMuC9oFj9SOi4Cl4b2wjDrseD0LRZ10W7R6Czo4w9ZznVSshKjuIomsRjvm9EKJQ==",
      "dependencies": {
        "@next/env": "14.2.4",
        "@swc/helpers": "0.5.5",
        "busboy": "1.6.0",
        "caniuse-lite": "^1.0.30001579",
        "graceful-fs": "^4.2.11",
        "postcss": "8.4.31",
        "styled-jsx": "5.1.1"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": ">=18.17.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "14.2.4",
        "@next/swc-darwin-x64": "14.2.4",
        "@next/swc-linux-arm64-gnu": "14.2.4",
        "@next/swc-linux-arm64-musl": "14.2.4",
        "@next/swc-linux-x64-gnu": "14.2.4",
        "@next/swc-linux-x64-musl": "14.2.4",
        "@next/swc-win32-arm64-msvc": "14.2.4",
        "@next/swc-win32-ia32-msvc": "14.2.4",
        "@next/swc-win32-x64-msvc": "14.2.4"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.41.2",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/next-themes": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/next-themes/-/next-themes-0.3.0.tgz",
      "integrity": "sha512-/QHIrsYpd6Kfk7xakK4svpDI5mmXP0gfvCoJdGpZQ2TOrQZmsW0QxjaiLn8wbIKjtm4BTSqLoix4lxYYOnLJ/w==",
      "peerDependencies": {
        "react": "^16.8 || ^17 || ^18",
        "react-dom": "^16.8 || ^17 || ^18"
      }
    },
    "node_modules/next/node_modules/postcss": {
      "version": "8.4.31",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.31.tgz",
      "integrity": "sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "nanoid": "^3.3.6",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/node-domexception": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz",
      "integrity": "sha512-/jKZoMpw0F8GRwl4/eLROPA3cfcXtLApP0QzLmUT/HuPCZWyB7IY9ZrMeKw2O/nFIqPQB3PVM9aYm0F312AXDQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/jimmywarting"
        },
        {
          "type": "github",
          "url": "https://paypal.me/jimmywarting"
        }
      ],
      "engines": {
        "node": ">=10.5.0"
      }
    },
    "node_modules/node-fetch": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.7.0.tgz",
      "integrity": "sha512-c4FRfUm/dbcWZ7U+1Wq0AwCyFL+3nt2bEw05wfxSz+DWpWsitgmSgYmy2dQdWyKC1694ELPqMs/YzUSNozLt8A==",
      "dependencies": {
        "whatwg-url": "^5.0.0"
      },
      "engines": {
        "node": "4.x || >=6.0.0"
      },
      "peerDependencies": {
        "encoding": "^0.1.0"
      },
      "peerDependenciesMeta": {
        "encoding": {
          "optional": true
        }
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/openai": {
      "version": "4.51.0",
      "resolved": "https://registry.npmjs.org/openai/-/openai-4.51.0.tgz",
      "integrity": "sha512-UKuWc3/qQyklqhHM8CbdXCv0Z0obap6T0ECdcO5oATQxAbKE5Ky3YCXFQY207z+eGG6ez4U9wvAcuMygxhmStg==",
      "dependencies": {
        "@types/node": "^18.11.18",
        "@types/node-fetch": "^2.6.4",
        "abort-controller": "^3.0.0",
        "agentkeepalive": "^4.2.1",
        "form-data-encoder": "1.7.2",
        "formdata-node": "^4.3.2",
        "node-fetch": "^2.6.7",
        "web-streams-polyfill": "^3.2.1"
      },
      "bin": {
        "openai": "bin/cli"
      }
    },
    "node_modules/openai/node_modules/@types/node": {
      "version": "18.19.34",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-18.19.34.tgz",
      "integrity": "sha512-eXF4pfBNV5DAMKGbI02NnDtWrQ40hAN558/2vvS4gMpMIxaf6JmD7YjnZbq0Q9TDSSkKBamime8ewRoomHdt4g==",
      "dependencies": {
        "undici-types": "~5.26.4"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw=="
    },
    "node_modules/path-scurry": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
      "integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
      "dependencies": {
        "lru-cache": "^10.2.0",
        "minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
      },
      "engines": {
        "node": ">=16 || 14 >=14.18"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/picocolors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.0.1.tgz",
      "integrity": "sha512-anP1Z8qwhkbmu7MFP5iTt+wQKXgwzf7zTyGlcdzabySa9vd0Xt392U0rVmz9poOaBj0uHJKyyo9/upk0HrEQew=="
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pify": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/pify/-/pify-2.3.0.tgz",
      "integrity": "sha512-udgsAY+fTnvv7kI7aaxbqwWNb0AHiB0qBO89PZKPkoTmGOgdbrHDKD+0B2X4uTfJ/FT1R09r9gTsjUjNJotuog==",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.6.tgz",
      "integrity": "sha512-saLsH7WeYYPiD25LDuLRRY/i+6HaPYr6G1OUlN39otzkSTxKnubR9RTxS3/Kk50s1g2JTgFwWQDQyplC5/SHZg==",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.4.38",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.38.tgz",
      "integrity": "sha512-Wglpdk03BSfXkHoQa3b/oulrotAkwrlLDRSOb9D0bN86FdRyE9lppSp33aHNPgBa0JKCoB+drFLZkQoRRYae5A==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "nanoid": "^3.3.7",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.2.0"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.0.1.tgz",
      "integrity": "sha512-dDLF8pEO191hJMtlHFPRa8xsizHaM82MLfNkUHdUtVEV3tgTp5oj+8qbEqYM57SLfc74KSbw//4SeJma2LRVIw==",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/postcss/"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.2.tgz",
      "integrity": "sha512-bSVhyJGL00wMVoPUzAVAnbEoWyqRxkjv64tUl427SKnPrENtq6hJwUojroMz2VB+Q1edmi4IfrAPpami5VVgMQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "dependencies": {
        "lilconfig": "^3.0.0",
        "yaml": "^2.3.4"
      },
      "engines": {
        "node": ">= 14"
      },
      "peerDependencies": {
        "postcss": ">=8.0.9",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "postcss": {
          "optional": true
        },
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-load-config/node_modules/lilconfig": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.2.tgz",
      "integrity": "sha512-eop+wDAvpItUys0FWkHIKeC9ybYrTGbU41U5K7+bttZZeohvnY7M9dZ5kB21GNWiFT2q1OoPTvncPCgSOVO5ow==",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.0.1.tgz",
      "integrity": "sha512-mEp4xPMi5bSWiMbsgoPfcP74lsWLHkQbZc3sY+jWYd65CUwXrUaTp0fmNpa01ZcETKlIgUdFN/MpS2xZtqL9dQ==",
      "dependencies": {
        "postcss-selector-parser": "^6.0.11"
      },
      "engines": {
        "node": ">=12.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/postcss/"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.0.tgz",
      "integrity": "sha512-UMz42UD0UY0EApS0ZL9o1XnLhSTtvvvLe5Dc2H2O56fvRZi+KulDyf5ctDhhtYJBGKStV2FL1fy6253cmLgqVQ==",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ=="
    },
    "node_modules/posthog-js": {
      "version": "1.139.2",
      "resolved": "https://registry.npmjs.org/posthog-js/-/posthog-js-1.139.2.tgz",
      "integrity": "sha512-myyuOADqZvYwgqmriwlKDEUDwLhscivFLh67UWBj4Wt9kOlmklvJb36W0ES2GAS6IdojbnGZGH5lF3heqreLWQ==",
      "dependencies": {
        "fflate": "^0.4.8",
        "preact": "^10.19.3"
      }
    },
    "node_modules/preact": {
      "version": "10.22.0",
      "resolved": "https://registry.npmjs.org/preact/-/preact-10.22.0.tgz",
      "integrity": "sha512-RRurnSjJPj4rp5K6XoP45Ui33ncb7e4H7WiOHVpjbkvqvA3U+N8Z6Qbo0AE6leGYBV66n8EhEaFixvIu3SkxFw==",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/preact"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ]
    },
    "node_modules/react": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-18.3.1.tgz",
      "integrity": "sha512-wS+hAgJShR0KhEvPJArfuPVN1+Hz1t0Y6n5jLrGQbkb4urgPE/0Rve+1kMB1v/oWgHgm4WIcV+i7F2pTVj+2iQ==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-day-picker": {
      "version": "8.10.1",
      "resolved": "https://registry.npmjs.org/react-day-picker/-/react-day-picker-8.10.1.tgz",
      "integrity": "sha512-TMx7fNbhLk15eqcMt+7Z7S2KF7mfTId/XJDjKE8f+IUcFn0l08/kI4FiYTL/0yuOLmEcbR4Fwe3GJf/NiiMnPA==",
      "funding": {
        "type": "individual",
        "url": "https://github.com/sponsors/gpbl"
      },
      "peerDependencies": {
        "date-fns": "^2.28.0 || ^3.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/react-dom": {
      "version": "18.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-18.3.1.tgz",
      "integrity": "sha512-5m4nQKp+rZRb09LNH59GM4BxTh9251/ylbKIbpe7TpGxfJ+9kv6BLkLBXIjjspbgbnIBNqlI23tRnTWT0snUIw==",
      "dependencies": {
        "loose-envify": "^1.1.0",
        "scheduler": "^0.23.2"
      },
      "peerDependencies": {
        "react": "^18.3.1"
      }
    },
    "node_modules/react-dropzone": {
      "version": "14.2.3",
      "resolved": "https://registry.npmjs.org/react-dropzone/-/react-dropzone-14.2.3.tgz",
      "integrity": "sha512-O3om8I+PkFKbxCukfIR3QAGftYXDZfOE2N1mr/7qebQJHs7U+/RSL/9xomJNpRg9kM5h9soQSdf0Gc7OHF5Fug==",
      "dependencies": {
        "attr-accept": "^2.2.2",
        "file-selector": "^0.6.0",
        "prop-types": "^15.8.1"
      },
      "engines": {
        "node": ">= 10.13"
      },
      "peerDependencies": {
        "react": ">= 16.8 || 18.0.0"
      }
    },
    "node_modules/react-hook-form": {
      "version": "7.52.0",
      "resolved": "https://registry.npmjs.org/react-hook-form/-/react-hook-form-7.52.0.tgz",
      "integrity": "sha512-mJX506Xc6mirzLsmXUJyqlAI3Kj9Ph2RhplYhUVffeOQSnubK2uVqBFOBJmvKikvbFV91pxVXmDiR+QMF19x6A==",
      "engines": {
        "node": ">=12.22.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/react-hook-form"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17 || ^18 || ^19"
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ=="
    },
    "node_modules/react-remove-scroll": {
      "version": "2.5.5",
      "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.5.5.tgz",
      "integrity": "sha512-ImKhrzJJsyXJfBZ4bzu8Bwpka14c/fQt0k+cyFp/PBhTfyDnU5hjOtM4AG/0AMyy8oKzOTR0lDgJIM7pYXI0kw==",
      "dependencies": {
        "react-remove-scroll-bar": "^2.3.3",
        "react-style-singleton": "^2.2.1",
        "tslib": "^2.1.0",
        "use-callback-ref": "^1.3.0",
        "use-sidecar": "^1.1.2"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-remove-scroll-bar": {
      "version": "2.3.6",
      "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.6.tgz",
      "integrity": "sha512-DtSYaao4mBmX+HDo5YWYdBWQwYIQQshUV/dVxFxK+KM26Wjwp1gZ6rv6OC3oujI6Bfu6Xyg3TwK533AQutsn/g==",
      "dependencies": {
        "react-style-singleton": "^2.2.1",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-resizable-panels": {
      "version": "2.0.19",
      "resolved": "https://registry.npmjs.org/react-resizable-panels/-/react-resizable-panels-2.0.19.tgz",
      "integrity": "sha512-v3E41kfKSuCPIvJVb4nL4mIZjjKIn/gh6YqZF/gDfQDolv/8XnhJBek4EiV2gOr3hhc5A3kOGOayk3DhanpaQw==",
      "peerDependencies": {
        "react": "^16.14.0 || ^17.0.0 || ^18.0.0",
        "react-dom": "^16.14.0 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/react-style-singleton": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.1.tgz",
      "integrity": "sha512-ZWj0fHEMyWkHzKYUr2Bs/4zU6XLmq9HsgBURm7g5pAVfyn49DgUiNgY2d4lXRlYSiCif9YBGpQleewkcqddc7g==",
      "dependencies": {
        "get-nonce": "^1.0.0",
        "invariant": "^2.2.4",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-textarea-autosize": {
      "version": "8.5.3",
      "resolved": "https://registry.npmjs.org/react-textarea-autosize/-/react-textarea-autosize-8.5.3.tgz",
      "integrity": "sha512-XT1024o2pqCuZSuBt9FwHlaDeNtVrtCXu0Rnz88t1jUGheCLa3PhjE1GH8Ctm2axEtvdCl5SUHYschyQ0L5QHQ==",
      "dependencies": {
        "@babel/runtime": "^7.20.13",
        "use-composed-ref": "^1.3.0",
        "use-latest": "^1.2.1"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.0.tgz",
      "integrity": "sha512-Owdv/Ft7IjOgm/i0xvNDZ1LrRANRfew4b2prF3OWMQLxLfu3bS8FVhCsrSCMK4lR56Y9ya+AThoTpDCTxCmpRA==",
      "dependencies": {
        "pify": "^2.3.0"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/regenerator-runtime": {
      "version": "0.14.1",
      "resolved": "https://registry.npmjs.org/regenerator-runtime/-/regenerator-runtime-0.14.1.tgz",
      "integrity": "sha512-dYnhHh0nJoMfnkZs6GmmhFknAGRrLznOu5nc9ML+EJxGvrx6H7teuevqVqCuPcPK//3eDrrjQhehXVx9cnkGdw=="
    },
    "node_modules/resolve": {
      "version": "1.22.8",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.8.tgz",
      "integrity": "sha512-oKWePCxqpd6FlLvGV1VU0x7bkPmmCNolxzjMf4NczoDnQcIWrAF+cPtZn5i6n+RfD2d9i0tzpKnG6Yk168yIyw==",
      "dependencies": {
        "is-core-module": "^2.13.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.0.4.tgz",
      "integrity": "sha512-U9nH88a3fc/ekCF1l0/UP1IosiuIjyTh7hBvXVMHYgVcfGvt897Xguj2UOLDeI5BG2m7/uwyaLVT6fbtCwTyzw==",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/scheduler": {
      "version": "0.23.2",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.23.2.tgz",
      "integrity": "sha512-UOShsPwz7NrMUqhR6t0hWjFduvOzbtv7toDH1/hIrfRNIDBnnBWd0CwJTGvTpngVlmwGCdP9/Zl/tVrDqcuYzQ==",
      "dependencies": {
        "loose-envify": "^1.1.0"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/sonner": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/sonner/-/sonner-1.5.0.tgz",
      "integrity": "sha512-FBjhG/gnnbN6FY0jaNnqZOMmB73R+5IiyYAw8yBj7L54ER7HB3fOSE5OFiQiE2iXWxeXKvg6fIP4LtVppHEdJA==",
      "peerDependencies": {
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.0.tgz",
      "integrity": "sha512-itJW8lvSA0TXEphiRoawsCksnlf8SyvmFzIhltqAHluXd88pkCd+cXJVHTDwdCr0IzwptSm035IHQktUu1QUMg==",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/standardized-audio-context": {
      "version": "25.3.72",
      "resolved": "https://registry.npmjs.org/standardized-audio-context/-/standardized-audio-context-25.3.72.tgz",
      "integrity": "sha512-Dvwu2NuqafQqWxUWoo6G9ze/cvVNlFDpmIOA8XjuItrfR0h/REjgjoYCT3Y7nbkUJKGoz8SqqVzR7JATQV4XeQ==",
      "dev": true,
      "dependencies": {
        "@babel/runtime": "^7.24.5",
        "automation-events": "^7.0.5",
        "tslib": "^2.6.2"
      }
    },
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/string-width": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
      "integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
      "dependencies": {
        "eastasianwidth": "^0.2.0",
        "emoji-regex": "^9.2.2",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width-cjs": {
      "name": "string-width",
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/string-width-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="
    },
    "node_modules/string-width-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.0.tgz",
      "integrity": "sha512-iq6eVVI64nQQTRYq2KtEg2d2uU7LElhTJwsH4YzIHZshxlgZms/wIc4VoDQTlG/IvVIrBKG06CrZnp0qv7hkcQ==",
      "dependencies": {
        "ansi-regex": "^6.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-ansi-cjs": {
      "name": "strip-ansi",
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/styled-jsx": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.1.tgz",
      "integrity": "sha512-pW7uC1l4mBZ8ugbiZrcIsiIvVx1UmTfw7UkC3Um2tmfUq9Bhk8IiyEIPl6F8agHgjzku6j0xQEZbfA5uSgSaCw==",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/sucrase": {
      "version": "3.35.0",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.0.tgz",
      "integrity": "sha512-8EbVDiu9iN/nESwxeSxDKe0dunta1GOlHufmSSXxMD2z2/tMZpDMpvXQGsc+ajGo8y2uYUmixaSRUc/QPoQ0GA==",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "glob": "^10.3.10",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-2.3.0.tgz",
      "integrity": "sha512-vkYrLpIP+lgR0tQCG6AP7zZXCTLc1Lnv/CCRT3BqJ9CZ3ui2++GPaGb1x/ILsINIMSYqqvrpqjUFsMNLlW99EA==",
      "dependencies": {
        "@babel/runtime": "^7.24.1"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "3.4.4",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.4.tgz",
      "integrity": "sha512-ZoyXOdJjISB7/BcLTR6SEsLgKtDStYyYZVLsUtWChO4Ps20CBad7lfJKVDiejocV4ME1hLmyY0WJE3hSDcmQ2A==",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.5.3",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.0",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.0",
        "lilconfig": "^2.1.0",
        "micromatch": "^4.0.5",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.0.0",
        "postcss": "^8.4.23",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.1",
        "postcss-nested": "^6.0.1",
        "postcss-selector-parser": "^6.0.11",
        "resolve": "^1.22.2",
        "sucrase": "^3.32.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tailwindcss-animate": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/tailwindcss-animate/-/tailwindcss-animate-1.0.7.tgz",
      "integrity": "sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA==",
      "peerDependencies": {
        "tailwindcss": ">=3.0.0 || insiders"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/tone": {
      "version": "15.0.4",
      "resolved": "https://registry.npmjs.org/tone/-/tone-15.0.4.tgz",
      "integrity": "sha512-Fr2xATgdkNhzwMZhrU0DXpkXQyambq73hjHRrBiC0Wkc6aPYRdmkySE9kRFAW878zgMiD+Lqvn/uNHt/7hbdnQ==",
      "dev": true,
      "dependencies": {
        "standardized-audio-context": "^25.3.70",
        "tslib": "^2.3.1"
      }
    },
    "node_modules/tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw=="
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA=="
    },
    "node_modules/tslib": {
      "version": "2.6.3",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.6.3.tgz",
      "integrity": "sha512-xNvxJEOUiWPGhUuUdQgAJPKOOJfGnIyKySOc09XkKsgdUV/3E2zvwZYdejjmRgPCgcym1juLH3226yA7sEFJKQ=="
    },
    "node_modules/typescript": {
      "version": "5.4.5",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.4.5.tgz",
      "integrity": "sha512-vcI4UpRgg81oIRUFwR0WSIHKt11nJ7SAVlYNIu+QpqeyXP+gpQJy/Z4+F0aGxSE4MqwjyXvW/TzgkLAx2AGHwQ==",
      "dev": true,
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "5.26.5",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-5.26.5.tgz",
      "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA=="
    },
    "node_modules/use-callback-ref": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.2.tgz",
      "integrity": "sha512-elOQwe6Q8gqZgDA8mrh44qRTQqpIHDcZ3hXTLjBe1i4ph8XpNJnO+aQf3NaG+lriLopI4HMx9VjQLfPQ6vhnoA==",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "^16.8.0 || ^17.0.0 || ^18.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-composed-ref": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/use-composed-ref/-/use-composed-ref-1.3.0.tgz",
      "integrity": "sha512-GLMG0Jc/jiKov/3Ulid1wbv3r54K9HlMW29IWcDFPEqFkSO2nS0MuefWgMJpeHQ9YJeXDL3ZUF+P3jdXlZX/cQ==",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/use-isomorphic-layout-effect": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/use-isomorphic-layout-effect/-/use-isomorphic-layout-effect-1.1.2.tgz",
      "integrity": "sha512-49L8yCO3iGT/ZF9QttjwLF/ZD9Iwto5LnH5LmEdk/6cFmXddqi2ulF0edxTwjj+7mqvpVVGQWvbXZdn32wRSHA==",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-latest": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/use-latest/-/use-latest-1.2.1.tgz",
      "integrity": "sha512-xA+AVm/Wlg3e2P/JiItTziwS7FK92LWrDB0p+hgXloIMuVCeJJ8v6f0eeHyPZaJrM+usM1FkFfbNCrJGs8A/zw==",
      "dependencies": {
        "use-isomorphic-layout-effect": "^1.1.1"
      },
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-scramble": {
      "version": "2.2.15",
      "resolved": "https://registry.npmjs.org/use-scramble/-/use-scramble-2.2.15.tgz",
      "integrity": "sha512-3+ngTV6OpkY9JT75FM4JYcspmpP7cd/h0/5KqsMU2jcdBD+SAuBMmLqLu0N3/7t8NsfdwJjD3BBeKtT+qZWKew==",
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "react": ">=16",
        "react-dom": ">=16"
      }
    },
    "node_modules/use-sidecar": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.2.tgz",
      "integrity": "sha512-epTbsLuzZ7lPClpz2TyryBfztm7m+28DlEv2ZCQ3MDr5ssiwyOwGH/e5F9CkfWjJ1t4clvI58yF822/GUkjjhw==",
      "dependencies": {
        "detect-node-es": "^1.1.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "^16.9.0 || ^17.0.0 || ^18.0.0",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.2.2.tgz",
      "integrity": "sha512-PElTlVMwpblvbNqQ82d2n6RjStvdSoNe9FG28kNfz3WiXilJm4DdNkEzRhCZuIDwY8U08WVihhGR5iRqAwfDiw==",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw=="
    },
    "node_modules/vaul": {
      "version": "0.9.1",
      "resolved": "https://registry.npmjs.org/vaul/-/vaul-0.9.1.tgz",
      "integrity": "sha512-fAhd7i4RNMinx+WEm6pF3nOl78DFkAazcN04ElLPFF9BMCNGbY/kou8UMhIcicm0rJCNePJP0Yyza60gGOD0Jw==",
      "dependencies": {
        "@radix-ui/react-dialog": "^1.0.4"
      },
      "peerDependencies": {
        "react": "^16.8 || ^17.0 || ^18.0",
        "react-dom": "^16.8 || ^17.0 || ^18.0"
      }
    },
    "node_modules/web-streams-polyfill": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-3.3.3.tgz",
      "integrity": "sha512-d2JWLCivmZYTSIoge9MsgFCZrt571BikcWGYkjC1khllbTeDlGqZ2D8vD8E/lJa8WGWbb7Plm8/XJYV7IJHZZw==",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ=="
    },
    "node_modules/whatwg-url": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
      "dependencies": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "8.1.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
      "integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
      "dependencies": {
        "ansi-styles": "^6.1.0",
        "string-width": "^5.0.1",
        "strip-ansi": "^7.0.1"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs": {
      "name": "wrap-ansi",
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A=="
    },
    "node_modules/wrap-ansi-cjs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi-cjs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yaml": {
      "version": "2.4.5",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.4.5.tgz",
      "integrity": "sha512-aBx2bnqDzVOyNKfsysjA2ms5ZlnjSAW2eG3/L5G/CSujfjLJTJsEw1bGw8kCf04KodQWk1pxlGnZ56CRxiawmg==",
      "bin": {
        "yaml": "bin.mjs"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/zod": {
      "version": "3.23.8",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.23.8.tgz",
      "integrity": "sha512-XBx9AXhXktjUqnepgTiE5flcKIYWi/rme0Eaj+5Y0lftuGBq+jyRu/md4WnuxqgP1ubdpNCsYEYPxrzVHD8d6g==",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    }
  }
}



================================================
FILE: examples/sound-effects/video-to-sfx/package.json
================================================
{
  "name": "video-to-sfx",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@ffmpeg/ffmpeg": "^0.12.10",
    "@ffmpeg/util": "^0.12.1",
    "@hookform/resolvers": "^3.6.0",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-aspect-ratio": "^1.0.3",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-collapsible": "^1.0.3",
    "@radix-ui/react-context-menu": "^2.1.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-hover-card": "^1.0.7",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-menubar": "^1.0.4",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@tanstack/react-query": "^5.45.0",
    "@upstash/ratelimit": "^1.2.1",
    "@vercel/kv": "^2.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.1.5",
    "framer-motion": "^11.2.10",
    "geist": "^1.3.0",
    "input-otp": "^1.2.4",
    "lodash": "^4.17.21",
    "lucide-react": "^0.395.0",
    "mobx": "^6.12.4",
    "mobx-react": "^9.1.1",
    "next": "14.2.4",
    "next-themes": "^0.3.0",
    "openai": "^4.51.0",
    "posthog-js": "^1.139.2",
    "react": "^18",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.52.0",
    "react-resizable-panels": "^2.0.19",
    "react-textarea-autosize": "^8.5.3",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "use-scramble": "^2.2.15",
    "vaul": "^0.9.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/lodash": "^4.17.5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "tone": "^15.0.4",
    "typescript": "^5"
  }
}



================================================
FILE: examples/sound-effects/video-to-sfx/postcss.config.mjs
================================================
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;



================================================
FILE: examples/sound-effects/video-to-sfx/tailwind.config.ts
================================================
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss";
import { PluginCreator } from "tailwindcss/types/config";

const LayoutUtilsPlugin: PluginCreator = ({ addBase }) => {
  addBase({
    ".stack": {
      display: "flex",
      flexDirection: "column",
    },
    ".hstack": {
      display: "flex",
      flexDirection: "row",
    },
    ".center": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    ".overlay": {
      position: "absolute",
      inset: "0",
      borderRadius: "inherit",
    },
  });
};

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), LayoutUtilsPlugin],
} satisfies Config;

export default config;



================================================
FILE: examples/sound-effects/video-to-sfx/tsconfig.json
================================================
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}



================================================
FILE: examples/sound-effects/video-to-sfx/.env.example
================================================
ELEVENLABS_API_KEY=
OPENAI_API_KEY=


================================================
FILE: examples/sound-effects/video-to-sfx/.gitignore
================================================
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts



================================================
FILE: examples/sound-effects/video-to-sfx/.vercelignore
================================================
.env


================================================
FILE: examples/sound-effects/video-to-sfx/app/globals.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 224 71.4% 4.1%;

    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;

    --popover: 0 0% 100%;
    --popover-foreground: 224 71.4% 4.1%;

    --primary: 220.9 39.3% 11%;
    --primary-foreground: 210 20% 98%;

    --secondary: 220 14.3% 95.9%;
    --secondary-foreground: 220.9 39.3% 11%;

    --muted: 220 14.3% 95.9%;
    --muted-foreground: 220 8.9% 46.1%;

    --accent: 220 14.3% 95.9%;
    --accent-foreground: 220.9 39.3% 11%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 20% 98%;

    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 224 71.4% 4.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71.4% 4.1%;
    --foreground: 210 20% 98%;

    --card: 224 71.4% 4.1%;
    --card-foreground: 210 20% 98%;

    --popover: 224 71.4% 4.1%;
    --popover-foreground: 210 20% 98%;

    --primary: 210 20% 98%;
    --primary-foreground: 220.9 39.3% 11%;

    --secondary: 215 27.9% 16.9%;
    --secondary-foreground: 210 20% 98%;

    --muted: 215 27.9% 16.9%;
    --muted-foreground: 217.9 10.6% 64.9%;

    --accent: 215 27.9% 16.9%;
    --accent-foreground: 210 20% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 20% 98%;

    --border: 215 27.9% 16.9%;
    --input: 215 27.9% 16.9%;
    --ring: 216 12.2% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}



================================================
FILE: examples/sound-effects/video-to-sfx/app/layout.tsx
================================================
import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { GeistMono } from "geist/font/mono";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import metaImage from "@/public/meta-image.png";
import { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Video to Sound Effects Generator | ElevenLabs",
  description: "Generate a custom AI sound effect for your video by ElevenLabs",
  openGraph: {
    title: "Video to Sound Effects Generator | ElevenLabs",
    description:
      "Generate a custom AI sound effect for your video by ElevenLabs",
    images: [{ url: `/meta-image.png` }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistMono.variable)}
      style={{
        // @ts-ignore
        "--font-mono": "var(--font-geist-mono)",
      }}
    >
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}



================================================
FILE: examples/sound-effects/video-to-sfx/app/page.tsx
================================================
"use client";
import { Mask, masks, shadows } from "@/frostin-ui";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FileInput } from "@/components/ui/file-input";
import { springs } from "@/frostin-ui/utils/springs";
import { useScramble } from "use-scramble";
import { Orchestrator } from "./state/orchestrator";
import { AudioPlayer } from "./state/player";
import { observer } from "mobx-react";
import { cn } from "@/lib/utils";
import { reaction } from "mobx";
import { QueryClient, QueryClientProvider, useMutation } from "@tanstack/react-query";
import { convertVideoToSFX } from "@/lib/videoToSFX";
import { ArrowRight, DownloadIcon, Github, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mergeAndDownload } from "@/lib/mergeAndDownload";
import posthog from "posthog-js";
import { Progress } from "@/components/ui/progress";

const HoverOverlay = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-[4px] bg-gradient-to-tr from-[#08B0D5] to-[#AD20D0] rounded-[inherit] opacity-0 -z-10 group-hover:inset-0 group-hover:opacity-[17.5%] transition-all duration-300",
        className,
      )}
    ></div>
  );
};

const queryClient = new QueryClient();

const LoadingIndicator = () => {
  const { ref, replay } = useScramble({
    text: "Analyzing your video...",
    tick: 3,
    onAnimationEnd: () => {
      setTimeout(() => {
        replay();
      }, 1000);
    },
  });

  return <p ref={ref} />;
};

const FunText = ({ text }: { text: string }) => {
  const { ref, replay } = useScramble({
    text: text,
    tick: 3,
    speed: 0.6,
    playOnMount: true,
    onAnimationEnd: () => {
      setTimeout(() => {
        replay();
      }, 1000);
    },
  });

  return <p ref={ref} />;
};

const variants = {
  card: {
    noFile: {
      boxShadow: shadows.soft({
        angle: 0,
        distance: 50,
        intensity: 0.8,
        blurriness: 0.8,
        color: "currentColor",
        layers: 1,
      }),
    },
    hasFile: {
      boxShadow: shadows.soft({
        angle: 0,
        distance: 50,
        intensity: 0,
        blurriness: 0.8,
        color: "currentColor",
        layers: 1,
      }),
      transition: springs.xxslow(),
    },
  },
  content: {
    noFile: {
      scale: 1,
      y: -220,
      x: "-50%",
    },
    hasFile: {
      scale: 1,
      y: -340,
      x: "-50%",
      transition: springs.xxslow(),
    },
  },
  overlay: {
    hasFile: {
      opacity: 1,
      transition: springs.xxslow(),
    },
    noFile: {
      opacity: 0,
    },
  },
  wave: {
    noFile: {
      scale: 1.08,
    },
    hasFile: {
      scale: 1,
      transition: springs.xxxslow(),
    },
  },
  loader: {
    noFile: {
      opacity: 0,
      y: 30,
    },
    hasFile: {
      opacity: 1,
      y: 0,
      transition: springs.xxxslow(),
    },
  },
};

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
  });
}

const HomeDetails = observer(() => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [orchestrator, setOrchestrator] = useState<Orchestrator | null>(null);
  const canceledRef = useRef(false);
  const [isDownloading, setIsDownloading] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [progress, setProgress] = useState([
    0,
    0,
    0,
    0,
  ]);

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFile(null);
        orchestrator?.stop();
        setOrchestrator(null);
        canceledRef.current = true;
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  });

  useEffect(() => {
    return reaction(
      () => ({
        playing: orchestrator?.playing,
        activeIndex: orchestrator?.activeIndex,
      }),
      () => {
        if (videoRef.current && orchestrator) {
          if (orchestrator.playing) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
    );
  }, [orchestrator]);

  const mutations = {
    videoToSfx: useMutation({
      mutationFn: async (file: File) =>
        convertVideoToSFX(URL.createObjectURL(file)),
    }),
  };

  useEffect(() => {
    posthog.capture("$pageview");
  }, []);

  return (
    <motion.main
      className="w-full"
      initial="noFile"
      animate={previewUrl ? "hasFile" : "noFile"}
    >
      <motion.video
        src="/wave-loop.mp4"
        autoPlay
        muted
        loop
        controls={false}
        className="fixed overlay object-cover pointer-events-none opacity-75 hidden md:block"
        variants={variants.wave}
      />
      <motion.div
        variants={variants.overlay}
        className="fixed overlay bg-white/85 backdrop-blur-lg pointer-events-none"
      ></motion.div>
      <div className="absolute md:flex justify-between p-4 hidden w-full text-black">
        <a href="https://elevenlabs.io/docs/api-reference/how-to-use-text-to-sound-effects">
          <div className="font-mono text-sm mb-1 text-gray-900">
            <span className="underline pr-2">
              ElevenLabs Texts to Sounds Effects API
            </span>
            <span className="pr-2">is now live</span>
            <ArrowRight className="inline-block" size={16} />
          </div>
        </a>
        <a
          href="https://github.com/elevenlabs/elevenlabs-examples/tree/main/examples/sound-effects/video-to-sfx"
          className="font-mono text-sm mb-1 text-gray-900"
        >
          <span className="pr-2">This code is open source on GitHub</span>
          <Github className="inline-block" size={16} />
        </a>
      </div>
      <motion.div
        className={cn(
          "flex flex-col md:hidden text-black p-4 gap-4",
          previewUrl && "hidden",
        )}
      >
        <a
          className="font-mono text-sm mb-1 text-gray-900"
          href="https://elevenlabs.io/docs/api-reference/how-to-use-text-to-sound-effects"
        >
          <span className="underline pr-2">Texts to Sounds Effects API</span>
          <span className="pr-2">is now live</span>
        </a>
        <a
          className="font-mono text-sm mb-1 text-gray-900"
          href="https://github.com/elevenlabs/elevenlabs-examples/tree/main/examples/sound-effects/video-to-sfx"
        >
          <span className="pr-2">
            This code is open source{" "}
            <span className="underline">on GitHub</span>
          </span>
        </a>
      </motion.div>
      <motion.div
        className="absolute w-full md:w-[620px] top-[50vh] left-1/2 mx-auto stack items-center gap-6 p-6 pt-0 pb-8 md:p-12 md:px-4 md:pb-16"
        variants={variants.content}
      >
        <motion.div
          variants={variants.card}
          className="w-full aspect-video rounded-3xl bg-white/80 backdrop-blur-[16px] text-transparent md:text-black"
        >
          {!previewUrl && (
            <FileInput
              className="h-full w-full"
              onChange={async ({ files }) => {
                setFile(files[0]);
                canceledRef.current = false;
                // const sfx = await convertVideoToSFX(
                //   URL.createObjectURL(files[0])
                // );
                const sfx = await mutations.videoToSfx.mutateAsync(files[0], {
                  onError: e => {
                    setFile(null);
                    window.alert(`Error: ${e}`);
                  },
                });
                if (!canceledRef.current) {
                  setOrchestrator(
                    new Orchestrator({
                      soundEffects: sfx.soundEffects,
                      caption: sfx.caption,
                    }),
                  );
                }
              }}
            >
              <img
                src="/logo-squircle.svg"
                className="w-16 h-16 mb-3 mix-blend-hard-light"
              />
              <div className="font-mono text-sm mb-1 text-gray-900">
                Video to sound effects
              </div>
              <div className="font-mono text-sm text-center text-gray-800/60 h-[1rem]">
                <FunText text="Upload a video." />
              </div>
            </FileInput>
          )}
          {previewUrl && (
            <motion.video
              ref={videoRef}
              src={previewUrl}
              className="h-full w-full rounded-[inherit] object-cover"
              controls
              playsInline
              onPlay={() => {
                orchestrator?.play(orchestrator.activeIndex);
              }}
              onPause={() => {
                orchestrator?.stop();
              }}
              muted
            />
          )}
        </motion.div>
        {mutations.videoToSfx.isPending && (
          <motion.div
            variants={variants.loader}
            className="w-full center font-mono py-4"
          >
            <LoadingIndicator />
          </motion.div>
        )}
        {orchestrator && (
          <>
            <motion.div className="w-full px-8">
              {/* <AutosizeTextarea
                className="w-full px-2 py-1 bg-transparent focus:outline-none"
                value={orchestrator.caption}
                onChange={() => {}}
              /> */}
            </motion.div>
            <motion.div className="stack gap-3 px-6 w-full">
              {orchestrator.sfxPlayers.map((player, index) => (
                <div className="flex items-center" key={index}>
                  <SoundEffect
                    key={"sound-effect" + index}
                    index={index}
                    onPlay={() => orchestrator.play(index)}
                    onPause={() => orchestrator.stop()}
                    player={player}
                    active={orchestrator.activeIndex === index}
                    onDownload={async () => {
                      const url = orchestrator.getAudioUrl(index);
                      if (!file || !url) {
                        window.alert("Error downloading");
                        return;
                      }
                      setIsDownloading(prev => {
                        const newState = [...prev];
                        newState[index] = true;
                        return newState;
                      });
                      await mergeAndDownload(file, url, (newProgress: number) => {
                        setProgress(prev => {
                          const newState = [...prev];
                          newState[index] = newProgress;
                          return newState;
                        });
                      });
                      setIsDownloading(prev => {
                        const newState = [...prev];
                        newState[index] = false;
                        return newState;
                      });
                    }}
                    progress={progress[index]}
                    isDownloading={isDownloading[index]}
                  />
                </div>
              ))}
            </motion.div>
          </>
        )}
      </motion.div>
    </motion.main>
  );
});

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeDetails />
    </QueryClientProvider>
  );
};

const Waveform = observer(
  ({
     player,
     barBgColor = "bg-gray-800/30",
   }: {
    player: AudioPlayer;
    barBgColor: string;
  }) => {
    if (!player.waveform) return null;

    const lastTime = player.waveform[player.waveform.length - 1].time;

    return (
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none fade-in-animation">
        {player.waveform.map((sample, i) => (
          <div
            key={i}
            style={{
              height: sample.value + "%",
              width: 1.5,
              minHeight: 1,
              position: "absolute",
              left: (sample.time / lastTime) * 100 + "%",
            }}
            className={"rounded-full " + barBgColor}
          />
        ))}
      </div>
    );
  },
);

const SoundEffect = observer(
  ({
     index,
     player,
     onPlay,
     onPause,
     active,
     onDownload,
     isDownloading,
     progress,
   }: {
    index: number;
    player: AudioPlayer;
    onPlay: () => void;
    onPause: () => void;
    active: boolean;
    onDownload: () => void;
    isDownloading: boolean;
    progress: number
  }) => {
    return (
      <motion.div
        role={"button"}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { ...springs.xxxslow(), delay: index * 0.1 },
        }}
        className="flex justify-between group relative h-16 rounded-xl w-full focus-visible:ring-gray-800 focus-visible:ring-2 focus-visible:outline-none"
        onClick={() => {
          if (player.playing) {
            onPause?.();
          } else {
            onPlay?.();
          }
        }}
        onKeyDown={e => {
          if (e.key === " ") {
            e.preventDefault();
            if (player.playing) {
              onPause?.();
            } else {
              onPlay?.();
            }
          }
        }}
      >
        <HoverOverlay className={cn(active && "opacity-20 inset-0")} />
        <div className="relative flex-1 h-full rounded-inherit hstack gap-1">
          <div className="overlay inset-4">
            <Waveform player={player} barBgColor="bg-gray-900/20" />
            <Mask
              className="overlay"
              image={masks.linear({
                direction: "to-right",
                opacities: [1, 1, 0, 0],
                positions: [0, player.progress - 0.001, player.progress, 1],
              })}
            >
              <Waveform player={player} barBgColor="bg-gray-900/100" />
            </Mask>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={e => {
            e.stopPropagation();
            onDownload?.();
          }}
          key={"download" + index}
          className="self-center mr-3 rounded-full bg-transparent hover:bg-white/25 active:bg-white/40 border-gray-800/20"
        >
          {isDownloading ? (
            <span className={'text-[10px] text-gray-900/50'}>{progress}%</span>
          ) : (
            <DownloadIcon size={16} className="text-gray-800/50" />
          )}
        </Button>
      </motion.div>
    );
  }
);

export default Home;



================================================
FILE: examples/sound-effects/video-to-sfx/app/api/interface.ts
================================================
export type VideoToSFXRequestBody = {
  frames: string[]; // base64 encoded images
  maxDuration?: number; // maximum of 11
};

export type VideoToSFXResponseBody = {
  soundEffects: string[]; // base64 encoded sound effects
  caption: string; // captions for frame
};



================================================
FILE: examples/sound-effects/video-to-sfx/app/api/route.ts
================================================
export const maxDuration = 60; // This function can run for a maximum of 60 seconds
export const dynamic = "force-dynamic";

import {
  VideoToSFXRequestBody,
  VideoToSFXResponseBody,
} from "@/app/api/interface";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

export async function GET(request: Request) {
  return new Response("Live");
}

const MAX_SFX_PROMPT_LENGTH = 200;
const NUM_SAMPLES = 4;
const MAX_DURATION = 11;

const generateSoundEffect = async (
  prompt: string,
  maxDuration: number
): Promise<string> => {
  if (!process.env.ELEVENLABS_API_KEY) {
    throw new Error("No API key");
  }
  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "xi-api-key": process.env.ELEVENLABS_API_KEY || "",
    }),
    body: JSON.stringify({
      text: prompt,
      duration_seconds: maxDuration,
      prompt_influence: 0.3,
    }),
  };
  const response = await fetch(
    "https://api.elevenlabs.io/v1/sound-generation",
    options
  );

  if (!response.ok) {
    throw new Error("Failed to generate sound effect");
  }
  const buffer = await response.arrayBuffer(); // Get an ArrayBuffer from the response

  // Convert ArrayBuffer to base64 string
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:audio/mpeg;base64,${base64}`;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const isCaptionSafeForWork = async (caption: string): Promise<boolean> => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("No API key");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `Determine if the following caption is safe for work (SFW):

        Be very strict in what is considered appropriate and forbid anything that can be deemed as sexual, violent, or inappropriate, especially if it includes children or minors.
        
        Examples of innapropriate prompts include:

        - "Toilet flushing sounds"
        - "A young child sitting on the toilet"
        - "Bathroom ambiance with a child reading aloud from a book while sitting on the toilet."
        
        Caption: "${caption}"
        
        Respond with only "true" if the caption is safe for work and "false" if it is not.`,
      },
    ],
  });

  const result = response?.choices?.[0]?.message?.content?.trim();

  if (result !== "true" && result !== "false") {
    throw new Error("Failed to determine if the caption is safe for work");
  }

  return result === "true";
};

const generateCaptionForImage = async (
  imagesBase64: string[]
): Promise<string> => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("No API key");
  }
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Understand what's in this video and create a prompt for an AI video to SFX model
    
    Give a short prompt that only include the details needed for the main sound in the video. It should be ${MAX_SFX_PROMPT_LENGTH} characters or less. Just give the prompt, don't say anything else.`,
          },
          ...imagesBase64.map(imageBase64 => ({
            type: "image_url",
            image_url: {
              url: `${imageBase64}`,
            },
          })),
        ],
      },
    ] as ChatCompletionMessageParam[],
  });
  const caption = response.choices[0].message.content;
  if (!caption) {
    throw new Error("Failed to generate caption");
  }
  return caption.slice(0, MAX_SFX_PROMPT_LENGTH);
};

export async function POST(request: Request) {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const ip = request.headers.get("x-forwarded-for");
    const MAX_PER_HOUR = 20;
    const HOUR = 60 * 60;
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(MAX_PER_HOUR, `${HOUR}s`),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`
    );

    if (!success) {
      return new Response(
        `You have reached your request limit for the hour of ${HOUR} requests. Please try again in 1 hour`,
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }
  } else {
    console.log(
      "KV_REST_API_URL and KV_REST_API_TOKEN env vars not found, not rate limiting..."
    );
  }

  const { frames, maxDuration } =
    (await request.json()) as VideoToSFXRequestBody;
  console.log("request started", frames, maxDuration);

  const duration =
    maxDuration && maxDuration < MAX_DURATION ? maxDuration : MAX_DURATION;

  let caption = "";
  try {
    caption = await generateCaptionForImage(frames);
    console.log("caption", caption);
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate caption", {
      status: 500,
    });
  }
  let isSafeForWork = false;
  try {
    isSafeForWork = await isCaptionSafeForWork(caption);
    console.log("isSafeForWork", isSafeForWork);
  } catch (error) {
    console.error(error);
    return new Response("Failed to determine if prompt is safe for work", {
      status: 500,
    });
  }
  if (!isSafeForWork) {
    return new Response("Prompt is deemed inappropriate", {
      status: 500,
    });
  }
  try {
    const soundEffects: string[] = [];
    await Promise.all(
      [...Array(NUM_SAMPLES)].map(() => generateSoundEffect(caption, duration))
    ).then(results => {
      soundEffects.push(...results);
    });
    return new Response(
      JSON.stringify({
        soundEffects,
        caption,
      } as VideoToSFXResponseBody),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response("Failed to generate sound effect", {
      status: 500,
    });
  }
}



================================================
FILE: examples/sound-effects/video-to-sfx/app/state/orchestrator.ts
================================================
import { action, autorun, computed, makeObservable, observable } from "mobx";
import { AudioPlayer } from "./player";

export class Orchestrator {
  sfxPlayers: AudioPlayer[] = [];
  activeIndex = -1;
  caption: string;
  playing: boolean;

  constructor({
    caption,
    soundEffects,
  }: {
    caption: string;
    soundEffects: string[];
  }) {
    this.playing = false;
    this.caption = caption;
    this.sfxPlayers = soundEffects.map(data => new AudioPlayer(data));
    makeObservable(this, {
      caption: observable.ref,
      sfxPlayers: observable.shallow,
      activeIndex: observable.ref,
      playing: observable.ref,
      activePlayer: computed,
      play: action,
      stop: action,
    });
    autorun(() => {
      if (this.playing) {
        this.sfxPlayers.forEach((player, index) => {
          if (index === this.activeIndex) {
            player.start();
          } else {
            player.stop();
          }
        });
      } else {
        this.sfxPlayers.forEach(player => {
          player.stop();
        });
      }
    });
  }

  get activePlayer(): AudioPlayer | null {
    return this.sfxPlayers[this.activeIndex] || null;
  }

  play(index: number) {
    this.activeIndex = index;
    this.playing = true;
  }

  stop() {
    this.playing = false;
  }

  getAudioUrl(index: number) {
    const player = this.sfxPlayers[index];
    return player.data;
  }
}



================================================
FILE: examples/sound-effects/video-to-sfx/app/state/player.ts
================================================
import * as Tone from "tone";
import { action, makeObservable, observable } from "mobx";
import { clamp } from "lodash";

type Sample = {
  value: number;
  time: number;
};

function resample(
  channelData: Float32Array,
  sampleRate: number,
  targetSampleRate?: number
): Sample[] {
  if (targetSampleRate && targetSampleRate >= sampleRate) {
    throw new Error(
      "Target sample rate should be less than the original sample rate"
    );
  }

  const factor = targetSampleRate
    ? Math.floor(sampleRate / targetSampleRate)
    : 1;
  const samplesWithTime = [];

  if (factor === 1) {
    // If no downsampling is needed, just copy the data over.
    for (let i = 0; i < channelData.length; i++) {
      samplesWithTime.push({ value: channelData[i], time: i / sampleRate });
    }
  } else {
    // Downsample
    for (let i = 0; i < channelData.length; i += factor) {
      let valueSum = 0;
      const actualCount = Math.min(factor, channelData.length - i);

      for (let j = 0; j < actualCount; j++) {
        valueSum += channelData[i + j];
      }

      const avgValue = valueSum / actualCount;
      samplesWithTime.push({ value: avgValue, time: i / sampleRate });
    }
  }

  return samplesWithTime;
}

function normalize(arr: Sample[], newMax = 1): Sample[] {
  if (arr.length === 0) {
    return []; // Early return for empty array
  }

  let currentMax = 0;
  // First pass: Find max absolute value and convert all values to absolute
  // This avoids a separate map operation just to take absolutes
  const absSamples = arr.map(sample => {
    const absValue = Math.abs(sample.value);
    if (absValue > currentMax) {
      currentMax = absValue;
    }
    return { time: sample.time, value: absValue };
  });

  if (currentMax === 0) {
    // If the max is 0, all samples are 0, so we can return the array as-is
    return absSamples;
  }

  const scaleFactor = newMax / currentMax;
  // Second pass: Normalize
  return absSamples.map(sample => ({
    time: sample.time,
    value: sample.value * scaleFactor,
  }));
}

export class AudioPlayer {
  _player: Tone.Player;
  waveformLoaded: boolean;
  audioLoaded: boolean;
  audio: HTMLAudioElement;
  progress: number = 0;
  playing: boolean;
  data: string;

  constructor(data: string) {
    this.audioLoaded = false;
    this.waveformLoaded = false;
    this.playing = false;
    this.data = data;
    this._player = new Tone.Player(
      data,
      action(() => {
        this.waveformLoaded = true;
      })
    ).toDestination();
    this.audio = new Audio(data);
    this.audio.addEventListener("canplay", () => {
      this.audioLoaded = true;
    });
    makeObservable(this, {
      audioLoaded: observable.ref,
      waveformLoaded: observable.ref,
      progress: observable.ref,
      playing: observable.ref,
    });
    this.audio.addEventListener(
      "timeupdate",
      action(() => {
        this.progress = clamp(
          this.audio.currentTime / this.audio.duration,
          0,
          1
        );
        if (this.progress >= 1) {
          this.stop();
        }
      })
    );
  }

  start() {
    this.audio.currentTime = 0;
    this.audio.play();
    this.playing = true;
  }

  stop() {
    this.audio.pause();
    this.playing = false;
  }

  get waveform() {
    if (!this.waveformLoaded) {
      return null;
    }
    // normalize the array so all magnitudes fall between 0-70
    return normalize(
      // sample the array, grabbing 20 samples per seconds
      resample(
        this._player.buffer.getChannelData(0),
        this._player.buffer.sampleRate,
        40
      ).map(s => ({
        time: s.time,
        value: s.value,
      })),
      80
    );
  }
}



================================================
FILE: examples/sound-effects/video-to-sfx/components/ui/aspect-ratio.tsx
================================================
"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }



================================================
FILE: examples/sound-effects/video-to-sfx/components/ui/button.tsx
================================================
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }



================================================
FILE: examples/sound-effects/video-to-sfx/components/ui/card.tsx
================================================
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



================================================
FILE: examples/sound-effects/video-to-sfx/components/ui/file-input.tsx
================================================
import { cn } from "@/lib/utils";
import { ReactNode, Ref, useState } from "react";
import Dropzone, { DropEvent, FileRejection } from "react-dropzone";

export const FileInput = ({
  children = "Drag and drop a file",
  className,
  onChange,
  accept = [],
  maxSize,
  inputRef,
}: {
  children?: ReactNode;
  className?: string;
  onChange: (data: {
    files: File[];
    rejectedFiles: FileRejection[];
    event: DropEvent;
  }) => void;
  accept?: string[];
  maxSize?: number; // megabytes
  inputRef?: Ref<HTMLInputElement>;
}) => {
  const acceptMap: Record<string, string[]> = {};
  accept.forEach(mimeType => {
    acceptMap[mimeType] = [];
  });

  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles, event) => {
        onChange({
          files: acceptedFiles,
          rejectedFiles: rejectedFiles,
          event,
        });
      }}
      maxSize={maxSize ? maxSize * 1048576 : undefined}
      accept={acceptMap}
    >
      {({ getRootProps, getInputProps, isDragActive }) => {
        const inputProps = getInputProps();
        return (
          <div
            className={cn(
              "p-3 cursor-pointer center rounded-lg transition-colors",
              isDragActive && "bg-gray-alpha-100",
              className
            )}
            {...getRootProps()}
          >
            <input {...inputProps} />
            <div className="center h-full w-full">{children}</div>
          </div>
        );
      }}
    </Dropzone>
  );
};



================================================
FILE: examples/sound-effects/video-to-sfx/components/ui/progress.tsx
================================================
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }



================================================
FILE: examples/sound-effects/video-to-sfx/components/ui/select.tsx
================================================
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/index.ts
================================================
export * from "./components";
export * from "./utils";



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/components/delayed-mount.tsx
================================================
import { useEffect, useState } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

interface DelayedMountProps extends HTMLMotionProps<"div"> {
  delay: number; // Duration in milliseconds
  children: React.ReactNode;
}

/**
 * Mounts its children only after the provided duration has elapsed.
 */
export const DelayedMount: React.FC<DelayedMountProps> = ({
  delay,
  children,
  ...otherProps
}) => {
  const [shouldRender, setShouldRender] = useState(delay === 0 ? true : false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [delay]);

  return (
    <motion.div {...otherProps}>{shouldRender ? children : null}</motion.div>
  );
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/components/index.ts
================================================
export * from "./delayed-mount";
export * from "./light";
export * from "./mask";
export * from "./scroll-mount";
export * from "./scroll";



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/components/light.tsx
================================================
import { MotionValue } from "framer-motion";
import { ReactNode, createContext, useContext } from "react";

export interface LightContextApi {
  angle: number | MotionValue<number>;
}

export const DEFAULT_LIGHT_ANGLE = 30;

const LightContext = createContext<LightContextApi>({
  angle: DEFAULT_LIGHT_ANGLE,
});

export const LightProvider = ({
  angle = DEFAULT_LIGHT_ANGLE,
  children,
}: {
  angle: number | MotionValue<number>;
  children: ReactNode;
}) => {
  return (
    <LightContext.Provider value={{ angle }}>{children}</LightContext.Provider>
  );
};

export const useLight = () => useContext(LightContext);



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/components/mask.tsx
================================================
import { HTMLMotionProps, MotionValue, motion } from "framer-motion";
import { forwardRef } from "react";

type Direction = "to-top" | "to-right" | "to-bottom" | "to-left";

const BASE_ROTATIONS = {
  "to-top": 0,
  "to-right": 90,
  "to-bottom": 180,
  "to-left": 270,
};

interface LinearMaskParams {
  opacities?: number[];
  positions?: (number | string)[];
  direction?: Direction;
  rotate?: number;
}

interface CustomLinearMaskParams {
  opacityFn: (position: number) => number;
  stops?: number;
  direction?: Direction;
  rotate?: number;
}

interface CircleMaskParams {
  opacities?: number[];
  positions?: number[];
}

interface EllipseMaskParams {
  opacities?: number[];
  positions?: number[];
}

const inferPositions = (length: number): number[] => {
  if (length < 2) throw new Error("Length must be at least 2");

  const positions: number[] = [];
  for (let i = 0; i < length; i++) {
    positions.push(i / (length - 1));
  }
  return positions;
};

export const masks = {
  linear: ({
    direction = "to-right",
    opacities = [1, 0],
    positions,
    rotate = 0,
  }: LinearMaskParams): string => {
    const baseRotation = BASE_ROTATIONS[direction];

    if (!positions || positions.length !== opacities.length) {
      positions = inferPositions(opacities.length);
    }

    const stops = positions.map(
      (p, i) =>
        `rgba(255, 255, 255, ${opacities[i]}) ${
          typeof p === "number" ? p * 100 + "%" : p
        }`
    );

    return `linear-gradient(${baseRotation + rotate}deg, ${stops.join(", ")})`;
  },
  customLinear: ({
    opacityFn,
    stops = 10,
    direction = "to-right",
    rotate = 0,
  }: CustomLinearMaskParams) => {
    const baseRotation = BASE_ROTATIONS[direction];
    const positions = Array.from({ length: stops }, (_, i) => i / (stops - 1));
    const opacities = positions.map(opacityFn);
    const gradientStops = positions.map(
      (pos, index) => `rgba(255, 255, 255, ${opacities[index]}) ${pos * 100}%`
    );

    return `linear-gradient(${baseRotation + rotate}deg, ${gradientStops.join(
      ", "
    )})`;
  },
  circle: ({ opacities = [1, 0], positions }: CircleMaskParams): string => {
    if (!positions || positions.length !== opacities.length) {
      positions = inferPositions(opacities.length);
    }

    const stops = positions.map(
      (p, i) => `rgba(255, 255, 255, ${opacities[i]}) ${p * 100}%`
    );

    return `radial-gradient(closest-side circle, ${stops.join(", ")})`;
  },
  ellipse: ({ opacities = [1, 0], positions }: EllipseMaskParams): string => {
    if (!positions || positions.length !== opacities.length) {
      positions = inferPositions(opacities.length);
    }

    const stops = positions.map(
      (p, i) => `rgba(255, 255, 255, ${opacities[i]}) ${p * 100}%`
    );

    return `radial-gradient(closest-side, ${stops.join(", ")})`;
  },
};

export interface MaskProps extends HTMLMotionProps<"div"> {
  image: string | MotionValue<string>;
  size?: string | MotionValue<string>;
}

export const Mask = forwardRef<HTMLDivElement, MaskProps>(
  ({ image, size, ...props }, ref) => {
    return (
      <motion.div
        {...props}
        ref={ref}
        style={{
          maskImage: image,
          WebkitMaskImage: image,
          maskSize: size,
          WebkitMaskSize: size,
          // maskComposite: "intersect",
          // WebkitMaskComposite: "intersect",
          ...props.style,
        }}
      />
    );
  }
);



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/components/mouse.tsx
================================================
import {
  HTMLMotionProps,
  SpringOptions,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useMemo,
  useCallback,
  ReactNode,
  useId,
} from "react";
import { motion } from "framer-motion";
import { MotionValue, useMotionValue, useVelocity } from "framer-motion";
import { Loose } from "../utils/types";

const SMOOTHING_SPRING = {
  mass: 0.01,
  damping: 2,
  stiffness: 100,
};

const useMousePosition = ({
  defaultX = -1000,
  defaultY = -1000,
}: { defaultX?: number; defaultY?: number } = {}) => {
  const x = useMotionValue(defaultX);
  const y = useMotionValue(defaultY);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    document.addEventListener("mousemove", listener);
    return () => document.removeEventListener("mousemove", listener);
  });

  return useMemo(
    () => ({
      x,
      y,
    }),
    [x, y]
  );
};

interface MouseContextApi {
  position: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  velocity: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  pushTarget: (target: MouseTargetInfo) => void;
  popTarget: (targetId: string) => void;
  activeTarget: MouseTargetInfo | undefined;
  targets: MouseTargetInfo[];
}

const MouseContext = createContext<MouseContextApi | null>(null);

export const useMouse = () => {
  const mouse = useContext(MouseContext);
  if (!mouse) {
    throw new Error("Cannot call useMouse outside of MouseProvider");
  }
  return mouse;
};

interface MouseTargetInfo {
  id: string;
  data: any;
}

export const MouseProvider = ({
  children,
  defaultX = -1000,
  defaultY = -1000,
}: {
  children: ReactNode;
  defaultX?: number;
  defaultY?: number;
}) => {
  const { x, y } = useMousePosition({ defaultX, defaultY });
  const xSpring = useSpring(x, SMOOTHING_SPRING);
  const velocityX = useVelocity(xSpring);
  const ySpring = useSpring(y, SMOOTHING_SPRING);
  const velocityY = useVelocity(ySpring);
  const [targets, setTargets] = useState<MouseTargetInfo[]>([]);

  const pushTarget = useCallback((target: MouseTargetInfo) => {
    setTargets((prev) => [...prev, target]);
  }, []);

  const popTarget = useCallback((id: string) => {
    setTargets((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const activeTarget = targets[targets.length - 1] as
    | MouseTargetInfo
    | undefined;

  const api = useMemo(
    () => ({
      position: {
        x,
        y,
      },
      velocity: {
        x: velocityX,
        y: velocityY,
      },
      pushTarget,
      popTarget,
      activeTarget,
      targets,
    }),
    [x, y, velocityX, velocityY, pushTarget, popTarget, activeTarget, targets]
  );

  return <MouseContext.Provider value={api}>{children}</MouseContext.Provider>;
};

interface MouseFollowerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode | ((mouse: MouseContextApi) => ReactNode);
  alignX?: Loose<"start" | "end" | "center">;
  alignY?: Loose<"start" | "end" | "center">;
}

const PERCENT_BY_ALIGNMENT: Record<string, string> = {
  start: "0%",
  center: "-50%",
  end: "-100%",
};

export const MouseFollower = ({
  children,
  alignX = "center",
  alignY = "center",
  ...otherProps
}: MouseFollowerProps) => {
  const mouse = useMouse();
  const transform = useTransform(
    [mouse.position.x, mouse.position.y],
    ([x, y]) =>
      `translateX(${x}px) translateY(${y}px) translateX(${
        PERCENT_BY_ALIGNMENT[alignX] || alignX
      }) translateY(${PERCENT_BY_ALIGNMENT[alignY] || alignY})`
  );

  return (
    <motion.div
      {...otherProps}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
        display: "inline-block",
        pointerEvents: "none",
        transform,
        ...otherProps.style,
      }}
    >
      {typeof children === "function" ? children(mouse) : children}
    </motion.div>
  );
};

interface MouseTargetProps extends HTMLMotionProps<"div"> {
  data: any;
}

export const MouseTarget = ({
  children,
  data = {},
  ...otherProps
}: MouseTargetProps) => {
  const id = useId();
  const ref = useRef(null);
  const mouse = useMouse();

  useEffect(() => {
    return () => mouse.popTarget(id);
  }, []);

  return (
    <motion.div
      ref={ref}
      {...otherProps}
      onMouseEnter={(e) => {
        mouse.pushTarget({ id, data });
        otherProps.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        mouse.popTarget(id);
        otherProps.onMouseLeave?.(e);
      }}
    >
      {children}
    </motion.div>
  );
};

export interface MouseSmoothingProps {
  position?: SpringOptions;
  velocity?: SpringOptions;
  children: React.ReactNode;
}

export const MouseSmoothing = ({
  position,
  velocity,
  children,
}: MouseSmoothingProps) => {
  const inherit = useMouse();
  const positionX = useSpring(inherit.position.x, position);
  const positionY = useSpring(inherit.position.y, position);
  const velocityX = useSpring(inherit.velocity.x, velocity);
  const velocityY = useSpring(inherit.velocity.y, velocity);

  const mouse = useMemo(
    () => ({
      ...inherit,
      position: {
        x: position ? positionX : inherit.position.x,
        y: position ? positionY : inherit.position.y,
      },
      velocity: {
        x: velocity ? velocityX : inherit.velocity.x,
        y: velocity ? velocityY : inherit.velocity.y,
      },
    }),
    [positionX, positionY, velocityX, velocityY, inherit, position, velocity]
  );

  return (
    <MouseContext.Provider value={mouse}>{children}</MouseContext.Provider>
  );
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/components/scroll-mount.tsx
================================================
import { HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

export interface ScrollMountProps extends HTMLMotionProps<"div"> {
  topWithin?: string;
  rightWithin?: string;
  bottomWithin?: string;
  leftWithin?: string;
  once?: boolean;
}

/**
 * Mounts children only when they enter the viewport.
 */
export const ScrollMount = React.forwardRef<HTMLDivElement, ScrollMountProps>(
  (
    {
      topWithin = "0px",
      rightWithin = "0px",
      bottomWithin = "0px",
      leftWithin = "0px",
      once = false,
      children,
      ...otherProps
    },
    ref
  ) => {
    const docRef = React.useRef<Document | null>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useLayoutEffect(() => {
      docRef.current = window.document;
    }, []);

    return (
      <motion.div
        {...otherProps}
        ref={ref}
        onViewportEnter={() => setMounted(true)}
        onViewportLeave={() => setMounted(false)}
        viewport={{
          root: docRef as any,
          margin: `${bottomWithin} ${leftWithin} ${topWithin} ${rightWithin}`,
          amount: "some",
          once,
        }}
      >
        {mounted && children}
      </motion.div>
    );
  }
);



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/components/scroll.tsx
================================================
import * as React from "react";
import {
  motion,
  useTransform,
  useScroll as useFramerMotionScroll,
  MotionValue,
  useVelocity,
  useMotionValueEvent,
  useSpring,
  SpringOptions,
  HTMLMotionProps,
} from "framer-motion";

interface ScrollApi {
  container: React.RefObject<HTMLElement>;
  progress: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  position: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
  velocity: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  };
}

const SMOOTHING_SPRING = {
  mass: 0.01,
  damping: 2,
  stiffness: 100,
};

const ScrollContext = React.createContext<ScrollApi | null>(null);

export const useScroll = () => {
  const scroll = React.useContext(ScrollContext);
  if (!scroll) {
    throw new Error(
      "Cannot call useScroll outside of ScrollContainer or WindowScrollProvider"
    );
  }
  return scroll;
};

interface ScrollSmoothingProps {
  progress?: SpringOptions;
  position?: SpringOptions;
  velocity?: SpringOptions;
  children: React.ReactNode;
}

export const ScrollSmoothing = ({
  progress,
  position,
  velocity,
  children,
}: ScrollSmoothingProps) => {
  const inherit = useScroll();
  const progressX = useSpring(inherit.progress.x, progress);
  const progressY = useSpring(inherit.progress.y, progress);
  const positionX = useSpring(inherit.position.x, position);
  const positionY = useSpring(inherit.position.y, position);
  const velocityX = useSpring(inherit.velocity.x, velocity);
  const velocityY = useSpring(inherit.velocity.y, velocity);

  const scroll = React.useMemo(
    () => ({
      ...inherit,
      progress: {
        x: progress ? progressX : inherit.progress.x,
        y: progress ? progressY : inherit.progress.y,
      },
      position: {
        x: position ? positionX : inherit.position.x,
        y: position ? positionY : inherit.position.y,
      },
      velocity: {
        x: velocity ? velocityX : inherit.velocity.x,
        y: velocity ? velocityY : inherit.velocity.y,
      },
    }),
    [
      progressX,
      progressY,
      positionX,
      positionY,
      velocityX,
      velocityY,
      inherit,
      progress,
      position,
      velocity,
    ]
  );

  return (
    <ScrollContext.Provider value={scroll}>{children}</ScrollContext.Provider>
  );
};

export const WindowScrollProvider = ({ children }: any) => {
  const container = React.useRef<HTMLElement>(null);
  const { scrollX, scrollXProgress, scrollY, scrollYProgress } =
    useFramerMotionScroll();
  // spring is necessary to smooth out velocity
  const scrollXSpring = useSpring(scrollX, SMOOTHING_SPRING);
  const scrollXVelocity = useVelocity(scrollXSpring);
  const scrollYSpring = useSpring(scrollY, SMOOTHING_SPRING);
  const scrollYVelocity = useVelocity(scrollYSpring);

  const scrollApi = React.useMemo(
    () => ({
      container,
      position: {
        x: scrollX,
        y: scrollY,
      },
      progress: {
        x: scrollXProgress,
        y: scrollYProgress,
      },
      velocity: {
        x: scrollXVelocity,
        y: scrollYVelocity,
      },
    }),
    [
      container,
      scrollX,
      scrollY,
      scrollXProgress,
      scrollYProgress,
      scrollXVelocity,
      scrollYVelocity,
    ]
  );

  React.useLayoutEffect(() => {
    // @ts-ignore
    container.current = document.documentElement;
  }, []);

  return (
    <ScrollContext.Provider value={scrollApi}>
      {children}
    </ScrollContext.Provider>
  );
};

interface ScrollContainerProps extends HTMLMotionProps<"div"> {}

export const ScrollContainer = ({
  children,
  ...otherProps
}: ScrollContainerProps) => {
  const container = React.useRef<HTMLDivElement>(null);
  const { scrollX, scrollXProgress, scrollY, scrollYProgress } =
    useFramerMotionScroll({ container });
  // spring is necessary to smooth out velocity
  const scrollXSpring = useSpring(scrollX, SMOOTHING_SPRING);
  const scrollXVelocity = useVelocity(scrollXSpring);
  const scrollYSpring = useSpring(scrollY, SMOOTHING_SPRING);
  const scrollYVelocity = useVelocity(scrollYSpring);

  const scrollApi = React.useMemo(
    () => ({
      container,
      position: {
        x: scrollX,
        y: scrollY,
      },
      progress: {
        x: scrollXProgress,
        y: scrollYProgress,
      },
      velocity: {
        x: scrollXVelocity,
        y: scrollYVelocity,
      },
    }),
    [
      container,
      scrollX,
      scrollY,
      scrollXProgress,
      scrollYProgress,
      scrollXVelocity,
      scrollYVelocity,
    ]
  );

  return (
    <ScrollContext.Provider value={scrollApi}>
      <motion.div
        {...otherProps}
        ref={container}
        style={{
          position: "relative",
          overflow: "auto",
          ...otherProps.style,
        }}
      >
        {children}
      </motion.div>
    </ScrollContext.Provider>
  );
};

interface ScrollIntersection {
  target: "start" | "center" | "end" | number;
  container: "start" | "center" | "end" | number;
}

interface ScrollTargetProps extends React.HTMLProps<HTMLDivElement> {
  zero?: ScrollIntersection;
  one?: ScrollIntersection;
  axis?: "x" | "y";
}

export const ScrollTarget = ({
  children,
  zero = { target: "start", container: "start" },
  one = { target: "end", container: "end" },
  axis = "y",
  ...otherProps
}: ScrollTargetProps) => {
  const inherited = useScroll();
  const target = React.useRef<HTMLDivElement>(null);
  const { scrollX, scrollXProgress, scrollY, scrollYProgress } =
    useFramerMotionScroll({
      target: target,
      container: inherited.container,
      axis,
      offset: [
        `${zero.target} ${zero.container}`,
        `${one.target} ${one.container}`,
      ],
    });

  const scrollApi = React.useMemo(
    () => ({
      container: inherited.container,
      position: {
        x: scrollX,
        y: scrollY,
      },
      progress: {
        x: scrollXProgress,
        y: scrollYProgress,
      },
      velocity: {
        x: inherited.velocity.x,
        y: inherited.velocity.y,
      },
    }),
    [
      inherited.container,
      scrollX,
      scrollY,
      scrollXProgress,
      scrollYProgress,
      inherited.velocity.x,
      inherited.velocity.y,
    ]
  );

  return (
    <ScrollContext.Provider value={scrollApi}>
      <div {...otherProps} ref={target}>
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

interface ScrollRangeProps {
  zero?: number;
  one?: number;
  children: React.ReactNode;
}

export const ScrollRange = ({
  children,
  zero = 0,
  one = 1,
  ...otherProps
}: ScrollRangeProps) => {
  const inherited = useScroll();
  const adjustedXProgress = useTransform(
    inherited.progress.x,
    [zero, one],
    [0, 1]
  );
  const adjustedYProgress = useTransform(
    inherited.progress.y,
    [zero, one],
    [0, 1]
  );
  const scrollApi = React.useMemo(
    () => ({
      container: inherited.container,
      position: {
        x: inherited.position.x,
        y: inherited.position.y,
      },
      progress: {
        x: adjustedXProgress,
        y: adjustedYProgress,
      },
      velocity: {
        x: inherited.velocity.x,
        y: inherited.velocity.y,
      },
    }),
    [
      inherited.container,
      inherited.position.x,
      inherited.position.y,
      adjustedXProgress,
      adjustedYProgress,
      inherited.velocity.x,
      inherited.velocity.y,
    ]
  );

  return (
    <ScrollContext.Provider value={scrollApi}>
      {children}
    </ScrollContext.Provider>
  );
};

type ScrollDirection = "up" | "down" | "static";

// Derive current scroll status from velocity
export const useScrollDirection = (): ScrollDirection => {
  const scroll = useScroll();
  const [direction, setDirection] = React.useState<ScrollDirection>("static");
  useMotionValueEvent(scroll.velocity.y, "change", (val) => {
    if (val > 0) {
      setDirection("down");
    } else if (val < 0) {
      setDirection("up");
    } else {
      setDirection("static");
    }
  });
  return direction;
};

export const useScrollAtStart = ({ axis = "y" }: { axis?: "x" | "y" } = {}) => {
  const scroll = useScroll();
  const [atStart, setAtStart] = React.useState(true);

  React.useEffect(() => {
    const listener = () => {
      const { scrollTop, scrollLeft } = scroll.container.current!;
      if (axis === "y") {
        setAtStart(scrollTop < 1);
      } else if (axis === "x") {
        setAtStart(scrollLeft < 1);
      }
    };
    scroll.container.current?.addEventListener("scroll", listener);
    return () => {
      scroll.container.current?.removeEventListener("scroll", listener);
    };
  });

  return atStart;
};

export const useScrollAtEnd = ({ axis = "y" }: { axis?: "x" | "y" } = {}) => {
  const scroll = useScroll();
  const [atEnd, setAtEnd] = React.useState(false);

  React.useEffect(() => {
    const listener = () => {
      const {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        clientHeight,
        clientWidth,
      } = scroll.container.current!;
      if (axis === "y") {
        setAtEnd(scrollHeight - scrollTop - clientHeight < 1);
      } else if (axis === "x") {
        setAtEnd(scrollWidth - scrollLeft - clientWidth < 1);
      }
    };
    scroll.container.current?.addEventListener("scroll", listener);
    return () => {
      scroll.container.current?.removeEventListener("scroll", listener);
    };
  });

  return atEnd;
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/clocks.tsx
================================================
import {
  MotionValue,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import React from "react";
import { useScroll, useScrollDirection } from "../components/scroll";

export interface Clock {
  value: MotionValue<number>;
  setRate: (rate: number) => void;
}

export const useClock = ({ defaultValue = 0, rate = 1 } = {}): Clock => {
  const value = useMotionValue(defaultValue);
  const rateRef = React.useRef(rate);
  useAnimationFrame((_, delta) => {
    value.set(value.get() + delta * rateRef.current);
  });
  return {
    value,
    setRate: (rate: number) => {
      rateRef.current = rate;
    },
  };
};

export const useScrollAcceleratedClock = ({
  acceleration = 5,
}: {
  acceleration?: number;
} = {}): Clock => {
  const scroll = useScroll();
  const direction = useScrollDirection();
  const clock = useClock({ rate: 1 });
  const [baseRate, setBaseRate] = React.useState(1);

  React.useEffect(() => {
    if (direction === "up") {
      setBaseRate(-1);
    } else if (direction === "down") {
      setBaseRate(1);
    }
  }, [direction]);

  useMotionValueEvent(scroll.velocity.y, "change", (velocity) => {
    clock.setRate(baseRate + (velocity / 1000) * acceleration);
  });

  return clock;
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/gradients.ts
================================================
type Direction = "to-top" | "to-right" | "to-bottom" | "to-left";

const BASE_ROTATIONS = {
  "to-top": 0,
  "to-right": 90,
  "to-bottom": 180,
  "to-left": 270,
};

export interface LinearGradientParams {
  colors: string[];
  positions?: (number | string)[];
  direction?: Direction;
  rotate?: number;
}

const inferPositions = (length: number): number[] => {
  if (length < 2) throw new Error("Length must be at least 2");

  const positions: number[] = [];
  for (let i = 0; i < length; i++) {
    positions.push(i / (length - 1));
  }
  return positions;
};

export const gradients = {
  linear: ({
    direction = "to-right",
    colors,
    positions,
    rotate = 0,
  }: LinearGradientParams): string => {
    const baseRotation = BASE_ROTATIONS[direction];

    if (!positions || positions.length !== colors.length) {
      positions = inferPositions(colors.length);
    }

    const stops = positions.map(
      (p, i) => `${colors[i]} ${typeof p === "number" ? p * 100 + "%" : p}`
    );

    return `linear-gradient(${baseRotation + rotate}deg, ${stops.join(", ")})`;
  },
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/index.ts
================================================
export * from "./math";
export * from "./shadows";
export * from "./motion";
export * from "./clocks";
export * from "./gradients";



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/math.ts
================================================
export function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function toDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

export const cos = (degrees: number) => {
  return Math.cos(toRadians(degrees));
};

export const sin = (degrees: number) => {
  return Math.sin(toRadians(degrees));
};

export const tan = (degrees: number) => {
  return Math.tan(toRadians(degrees));
};

export function toComponents(degrees: number) {
  return {
    x: cos(degrees),
    y: sin(degrees),
  };
}



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/motion.tsx
================================================
import { useEffect } from "react";
import { useMotionValue, MotionValue, isMotionValue } from "framer-motion";

export function useCoerceToMotionValue<T>(
  val: T | MotionValue<T>
): MotionValue<T> {
  const fallbackMotionVal = useMotionValue(
    isMotionValue(val) ? val.get() : val
  );

  useEffect(() => {
    if (!isMotionValue(val)) {
      fallbackMotionVal.set(val);
    }
  }, [val]);

  return isMotionValue(val) ? val : fallbackMotionVal;
}



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/shadows.ts
================================================
import { range } from "lodash";
import { clamp } from "framer-motion";
import { tan, toComponents } from "./math";

export const shadows = {
  standard: ({
    xOffset,
    yOffset,
    blur = 0,
    spread = 0,
    color = "rgba(0,0,0,0.1)",
    inset = false,
  }: {
    xOffset: number;
    yOffset: number;
    blur?: number;
    spread?: number;
    color?: string;
    inset?: boolean;
  }) => {
    let shadow = `${xOffset}px ${yOffset}px ${blur}px ${spread}px ${color}`;
    if (inset) {
      shadow = `inset ${shadow}`;
    }
    return shadow;
  },
  old_soft: ({
    angle,
    intensity = 0.02,
    distance = 10,
    blurriness = 1,
    color = "black",
    layers = 5,
  }: {
    angle: number;
    intensity: number;
    distance: number;
    blurriness: number;
    color?: string;
    layers: number;
  }) => {
    angle = angle += 90;
    const elevation = distance;
    const components = toComponents(angle);
    const step = 45 / layers;
    return range(layers)
      .map((i) => {
        const d = tan(45 - step * i) * elevation;
        const xOffset = components.x * d;
        const yOffset = components.y * d;
        const opacity = clamp(0, 1, (intensity * 200) / (20 + d) ** 2);
        return shadows.standard({
          xOffset,
          yOffset,
          blur: d * blurriness * 2,
          color: `color-mix(in srgb, ${color}, transparent ${
            (1 - opacity) * 100
          }%)`,
        });
      })
      .join(", ");
  },
  soft2: ({
    angle,
    intensity = 0.02,
    distance = 10,
    blurriness = 1,
    color = "black",
    layers = 5,
  }: {
    angle: number;
    intensity: number;
    distance: number;
    blurriness: number;
    color?: string;
    layers: number;
  }) => {
    angle = angle += 90;
    const components = toComponents(angle);
    const base = distance ** (1 / layers);
    const getDistance = (layer: number) => base ** (layer + 1);
    return range(layers)
      .map((layer) => {
        const d = getDistance(layer);
        const xOffset = components.x * d;
        const yOffset = components.y * d;
        const opacity = clamp(0, 1, (10 * intensity) / (20 + d));
        return shadows.standard({
          xOffset,
          yOffset,
          blur: d * blurriness * 2,
          color: `color-mix(in srgb, ${color}, transparent ${
            (1 - opacity) * 100
          }%)`,
        });
      })
      .join(", ");
  },
  soft: ({
    angle = 0,
    intensity = 0.02,
    distance = 10,
    blurriness = 1,
    color = "black",
    layers = 5,
  }: {
    angle?: number;
    intensity?: number;
    distance?: number;
    blurriness?: number;
    color?: string;
    layers?: number;
  }) => {
    angle = angle += 90;
    const components = toComponents(angle);
    const base = distance ** (1 / layers);
    const getDistance = (layer: number) => base ** (layer + 1);
    return range(layers)
      .map((layer) => {
        const d = getDistance(layer);
        const xOffset = components.x * d;
        const yOffset = components.y * d;
        const opacity = clamp(0, 1, (10 * intensity) / (50 + d) ** 0.9);
        return shadows.standard({
          xOffset,
          yOffset,
          blur: d * blurriness * 2,
          color: `color-mix(in srgb, ${color}, transparent ${
            (1 - opacity) * 100
          }%)`,
        });
      })
      .join(", ");
  },
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/springs.ts
================================================
import { Spring } from "framer-motion";

export type SpringPresetFn = (overrides: Partial<Spring>) => Spring;

export const springs = {
  xxxslow: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 22.5,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
  xxslow: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 20,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
  xslow: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 17.5,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
  slow: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 15,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
  normal: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 12.5,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
  fast: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 10,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
  xfast: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 7.5,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
  xxfast: (overrides: Partial<Spring> = {}): Spring => ({
    type: "spring",
    mass: 0.1,
    damping: 5,
    stiffness: 100,
    restDelta: 0.0001,
    ...overrides,
  }),
};



================================================
FILE: examples/sound-effects/video-to-sfx/frostin-ui/utils/types.ts
================================================
export type Loose<T> = T | (string & {});
export type Strictify<T extends string> = T extends `${infer _}` ? T : never;



================================================
FILE: examples/sound-effects/video-to-sfx/lib/mergeAndDownload.ts
================================================
export async function mergeAndDownload(
  videoFile: File | null,
  audioData: string,
  setProgress: (progress: number) => void,
) {
  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const { fetchFile, toBlobURL } = await import("@ffmpeg/util");
  const ffmpeg = new FFmpeg();

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });
  };

  ffmpeg.on("progress", ({ progress }) => {
    const p = Math.max(0, Math.min(100, Math.floor(progress * 100)));
    console.log(p);
    setProgress(p);
  });

  const process = async () => {
    console.log("transcoding");
    if (!videoFile) {
      throw new Error("No video file");
    }

    if (videoFile) {
      await ffmpeg.writeFile(
        "input.mp4",
        await fetchFile(URL.createObjectURL(videoFile)),
      );
    }

    await ffmpeg.writeFile("audio.mpeg", await fetchFile(audioData));

    await ffmpeg.exec(["-v", "error", "-i", "input.mp4", "-f", "null", "-"]);

    await ffmpeg.exec(["-v", "error", "-i", "audio.mpeg", "-f", "null", "-"]);

    await ffmpeg.exec([
      "-i", "input.mp4",
      "-i", "audio.mpeg",
      "-map", "0:v",
      "-map", "1:a",
      "-c:v", "copy",
      "-c:a", "aac",
      "output.mp4",
    ]);

    console.log("transcoding completed");
    const data = (await ffmpeg.readFile("output.mp4")) as Uint8Array;
    const final_url = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" }),
    );
    const downloadLinkFinalVideo = document.createElement("a");
    downloadLinkFinalVideo.href = final_url;
    downloadLinkFinalVideo.download = "final_output.mp4";
    downloadLinkFinalVideo.click();
    setProgress(0);
  };

  await load();
  await process();
}



================================================
FILE: examples/sound-effects/video-to-sfx/lib/utils.ts
================================================
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



================================================
FILE: examples/sound-effects/video-to-sfx/lib/videoToSFX.ts
================================================
import { maxDuration } from "./../app/api/route";
import { posthog } from "posthog-js";
import {
  VideoToSFXRequestBody,
  VideoToSFXResponseBody,
} from "@/app/api/interface";

const apiVideoToSFX = async (frames: string[], maxDuration: number) => {
  posthog?.capture("video_to_sfx_started");
  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify({ frames, maxDuration } as VideoToSFXRequestBody),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${errorText}`);
  }
  return (await response.json()) as VideoToSFXResponseBody;
};

const getFramesFromVideo = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  time: number
) => {
  return new Promise(resolve => {
    video.currentTime = time;
    setTimeout(() => {
      const ctx = canvas.getContext("2d");
      canvas.width = 150;
      canvas.height = 100;
      if (!ctx) {
        throw new Error("canvas context is null");
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/png");
      resolve(imageDataUrl);
    }, 100);
  });
};

export const convertVideoToSFX = async (
  previewUrl: string
): Promise<VideoToSFXResponseBody> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.muted = true;
    video.autoplay = true;
    const onLoad = async () => {
      try {
        const canvas = document.createElement("canvas");

        const frames: string[] = [];
        for (let i = 0; i < 4; i++) {
          video.currentTime = i;
          const frame = await getFramesFromVideo(video, canvas, i);
          frames.push(frame as string);
        }
        const sfx = await apiVideoToSFX(frames, video.duration);
        resolve({
          soundEffects: sfx.soundEffects,
          caption: sfx.caption,
        });
        video.removeEventListener("loadeddata", onLoad);
      } catch (e) {
        reject(e);
        video.removeEventListener("loadeddata", onLoad);
      }
    };
    video.addEventListener("loadeddata", onLoad);
    video.src = previewUrl;
  });
};



