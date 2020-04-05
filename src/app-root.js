import { Router } from '@vaadin/router';
import './pages/cart/app-cart';

const router = new Router(document.getElementById('root'));

router.setRoutes([
  {
    path: '/detail/:code',
    component: 'app-detail',
    action: async () => await import('./pages/detail/app-detail')
  },
  { path: '(.*)', component: 'app-cart' }
]);
