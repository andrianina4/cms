import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/common/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { NewArticlePage } from './pages/NewArticlePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ImportPage } from './pages/ImportPage';

import { EditArticlePage } from './pages/EditArticlePage';
import { NetworksPage } from './pages/NetworksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/new" element={<NewArticlePage />} />
          <Route path="/articles/:id/edit" element={<EditArticlePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/networks" element={<NetworksPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/import" element={<ImportPage />} />
          {/* Fallback to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

