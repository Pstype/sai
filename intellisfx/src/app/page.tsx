import VideoUploader from '../components/VideoUploader';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">IntelliSFX</h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
        Upload a video and let our AI generate a custom soundtrack for you.
      </p>
      <VideoUploader />
    </main>
  );
}
