import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSpring, animated } from '@react-spring/web';
import styles from './Navigation.module.scss';
import cx from 'classnames';

const Navigation = ({ primaryLinks, secondaryLinks, items }) => {
  const router = useRouter();
  const animProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 200
  });
  console.log(animProps);
  const [visibleMenu, setVisibleMenu] = useState('/');
  console.log(router);
  console.log('pathname', router.asPath);
  const [p, s, t] = router.asPath.match(/\/([a-zA-Z0-9-_])+/g) || ['/'];
  console.log(p);
  //console.log(Object.values(items.primary));
  const primaryItem = items.primary[p];
  const secondaryItems = primaryItem?.children;
  const tertiaryItems = s && secondaryItems && secondaryItems[s].children;
  console.log(secondaryItems);
  const { primary } = items;
  return (
    <>
      <div className={styles.desktop}>
        <div className={styles.primaryNav}>
          <div className={styles.primaryNav__branding}>Logo</div>
          <div className={styles.primaryNav__menu}>
            {Object.values(primary).map((link) => (
              <Link key={link.path} href={link.path}>
                <a
                  className={cx({
                    [styles['active--exact']]: link.path === router.asPath,
                    [styles['active']]: p === link.path && p !== router.asPath
                  })}
                >
                  {link.title}
                </a>
              </Link>
            ))}
          </div>
          <div className={styles.primaryNav__utilities}>Avatar</div>
        </div>
        <div className={styles.secondaryNav}>
          {secondaryItems && (
            <div className={styles.secondaryNav__menu}>
              {Object.entries(secondaryItems).map(([sKey, sValue]) => (
                <Link key={sValue.path} href={sValue.path}>
                  <a
                    className={cx({
                      [styles['active--exact']]: sValue.path === router.asPath,
                      [styles['active']]:
                        `${p}${s}` === sValue.path &&
                        sValue.path !== router.asPath
                    })}
                  >
                    {sValue.title}
                  </a>
                </Link>
              ))}
            </div>
          )}
          <div id='secondary' />
        </div>
      </div>
      <div className={styles.mobile}>
        <div className={styles.primaryNav}>
          <div className={styles.primaryNav__branding}>Logo Mobile</div>
          <div className={styles.primaryNav__menu}>
            {Object.values(primary).map((link) => {
              console.log(link);
              return (
                <>
                  <button onClick={() => setVisibleMenu(link.path)}>
                    {link.title}
                  </button>
                  {visibleMenu === link.path && (
                    <animated.ul
                      style={animProps}
                      className={cx(styles.submenu, {
                        [styles['submenu--open']]: link.path === visibleMenu
                      })}
                    >
                      <li>
                        <Link href={link.path}>
                          <a>{link.title}</a>
                        </Link>
                      </li>
                      {link.children &&
                        []
                          .concat(Object.entries(link.children))
                          .map(([sKey, sValue]) => {
                            return (
                              <li>
                                <Link href={sValue.path}>
                                  <a>{sValue.title}</a>
                                </Link>
                              </li>
                            );
                          })}
                    </animated.ul>
                  )}
                </>
              );
            })}
          </div>
          <div className={styles.primaryNav__utilities}>Avatar</div>
        </div>
        <div className={styles.secondaryNav}>
          {secondaryItems && (
            <div className={styles.secondaryNav__menu}>
              {Object.entries(secondaryItems).map(([sKey, sValue]) => (
                <Link key={sValue.path} href={sValue.path}>
                  <a
                    className={cx({
                      [styles['active--exact']]: sValue.path === router.asPath,
                      [styles['active']]:
                        `${p}${s}` === sValue.path &&
                        sValue.path !== router.asPath
                    })}
                  >
                    {sValue.title}
                  </a>
                </Link>
              ))}
            </div>
          )}
          <div id='secondary' />
        </div>
      </div>
    </>
  );
};

export default Navigation;
