import type { NextPage } from 'next';
import { CSVUploader } from '@/component/CSVUploader';

const Home: NextPage = () => {
  return (
    <div>
      <h1>Upload CSV File</h1>
      <CSVUploader />
    </div>
  );
};

export default Home;
