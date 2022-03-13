import '../styles/globals.css';
import Navigation from '../components/Navigation';

const navigationItems = {
  primary: {
    '/': {
      path: '/',
      title: 'Home'
    },
    '/items': {
      path: '/items',
      title: 'Items',
      children: {
        '/summary': {
          path: '/items/summary',
          title: 'Item Summary',
          parent: 'items'
        },
        '/abc': {
          path: '/items/abc',
          title: 'Item ABC',
          parent: 'items',
          children: {
            '/123': {
              path: '/items/abc/123',
              title: 'Item 123',
              parent: 'abc'
            }
          }
        }
      }
    },
    '/assets': {
      path: '/assets',
      title: 'Assets',
      children: {
        '/analytics': {
          path: '/assets/analytics',
          title: 'Analytics',
          parent: 'assets'
        }
      }
    }
  }
};

function MyApp({ Component, pageProps }) {
  return (
    <div className='page-wrapper'>
      <Navigation items={navigationItems} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
