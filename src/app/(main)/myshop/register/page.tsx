import Script from 'next/script';
import MyShopRegister from '@/src/components/store/MyShopRegister';
import getCookie from '@/src/lib/getCookie';
import styles from './page.module.scss';

export default function Home() {
  const accessToken = getCookie('token');
  const shopId = getCookie('s_id');

  return (
    <div className={styles.layout}>
      <Script
        src='//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
        strategy='afterInteractive'
      />
      <MyShopRegister token={accessToken} shopId={shopId} />
    </div>
  );
}
