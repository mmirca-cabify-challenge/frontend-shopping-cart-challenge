import { Router } from '@vaadin/router';
import './pages/cart/app-cart';
import './pages/detail/app-detail';

const router = new Router(document.getElementById('root'));

router.setRoutes([
  { path: '/detail', component: 'app-detail' },
  { path: '(.*)', component: 'app-cart' }
]);

window.router = router;