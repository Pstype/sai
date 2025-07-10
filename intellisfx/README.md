# IntelliSFX - AI-Powered Sound Effect Generation

IntelliSFX is a comprehensive Next.js application that provides a complete workflow for video upload, AI-powered analysis, and intelligent sound effect generation. Built with modern React patterns and a sophisticated component architecture, it features an intuitive dashboard for project management and a guided workflow through upload, generation, editing, and export phases.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, `tailwind-merge`, `clsx`
- **State Management**: Zustand with persistent stores
- **Backend**: Supabase (Storage, Auth, Database)
- **UI Components**: Custom component library with Radix UI primitives
- **Icons**: Lucide React
- **Validation**: Zod for API route validation
- **Development**: ESLint, TypeScript strict mode

## Key Features

- **Comprehensive Dashboard**: Full-featured project management with filtering, sorting, and real-time status updates
- **Video Upload & Analysis**: Secure video upload to Supabase Storage with 4-stage AI processing pipeline visualization
- **Project Workflow**: Complete user journey through upload → generate → edit → export phases
- **AI Integration Ready**: Built-in support for Lyria music generation and AudioGen sound effects
- **Timeline Editor**: DAW-style interface for audio editing and synchronization
- **Real-time Processing**: Live progress tracking with Zustand state management
- **Modern Component Library**: Comprehensive UI components with Tailwind CSS and Framer Motion
- **Responsive Design**: Mobile-first approach with adaptive layouts across all devices

## Getting Started

Follow these steps to set up the development environment and run the application.

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### 1. Install Dependencies

Install all required packages including UI components, state management, and Supabase integration:

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file and configure your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Open `.env.local` and replace the placeholder values with your actual Supabase project credentials from your dashboard under **Settings > API**:

- `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon/public key

### 3. Configure Supabase Storage

Create the following storage buckets in your Supabase project dashboard (**Storage > Buckets**):

- `videos`: For storing uploaded video files
- `audio`: For storing generated audio files  
- `thumbnails`: For storing video thumbnails

Set appropriate bucket policies for public access as needed for your use case. Detailed setup instructions are included in the `.env.local.example` file.

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application. You'll see the main dashboard with project management capabilities and can begin uploading videos to test the workflow.

## Project Structure

The application follows a modern Next.js App Router structure with organized components and stores:

```
src/
├── app/                    # Next.js App Router pages
│   ├── projects/          # Project workflow routes
│   │   └── [id]/         # Dynamic project pages
│   └── api/              # API routes for uploads
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   ├── dashboard/       # Dashboard-specific components
│   ├── upload/          # Upload functionality
│   └── processing/      # Processing pipeline components
├── stores/              # Zustand state management
├── lib/                 # Utilities and configurations
└── types/               # TypeScript type definitions
```

## Troubleshooting

### Common Setup Issues

- **"Could not find a Supabase project"**: Verify your `.env.local` file contains the correct Supabase URL and anon key from your project dashboard.

- **"Bucket not found"**: Ensure you've created all required storage buckets (`videos`, `audio`, `thumbnails`) in your Supabase dashboard under Storage > Buckets.

- **Module not found errors**: If you encounter missing package errors after installation:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- **TypeScript errors**: The project uses strict TypeScript. Ensure all dependencies are properly installed and your IDE supports TypeScript.

- **Build errors**: If you encounter build issues, check that all environment variables are properly set and Supabase is accessible.

### Development Tips

- Use the browser developer tools to monitor network requests and state changes
- Check the Supabase dashboard for storage usage and API logs
- The application includes comprehensive error boundaries and loading states
- All components are built with accessibility and responsive design in mind

For additional support, refer to the comprehensive comments in the `.env.local.example` file and component documentation.
