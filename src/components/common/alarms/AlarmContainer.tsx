'use client';

import putAlarmRead from '@/src/api/putAlarmRead';
import { STATUS_LABEL } from '@/src/constants/constant';
import { formatDateAndTime } from '@/src/lib/format';
import Image from 'next/image';
import approveIcon from '@/public/icons/approve.svg';
import rejectIcon from '@/public/icons/reject.svg';
import cancelIcon from '@/public/icons/cancel.svg';
import classNames from 'classnames';
import { getFromTime } from '@/src/lib/caculate';
import { useEffect, useState } from 'react';
import getAlarms from '@/src/api/getAlarms';
import styles from './AlarmContainer.module.scss';

interface AlarmContainerProps {
  userId: string;
  token: string;
  userType: string;
}

export default function AlarmContainer({
  userId,
  token,
  userType,
}: AlarmContainerProps) {
  const [checkRead, setCheckRead] = useState(false);
  const [unRead, setUnRead] = useState(0);
  const [alarms, setAlarms] = useState([]);
  useEffect(() => {
    const getUnread = async () => {
      const { items } = await getAlarms(userId, token);
      let filteredItems;
      if (userType === 'employee') {
        filteredItems = items.filter(
          item => item.item.read === false && item.item.result !== 'canceled',
        );
      } else if (userType === 'employer') {
        filteredItems = items.filter(
          item => item.item.read === false && item.item.result === 'canceled',
        );
      }
      const count = filteredItems.length;
      setUnRead(count);
      setAlarms([...filteredItems]);
    };
    getUnread();
    setCheckRead(false);
  }, [checkRead, unRead]);

  return (
    <>
      <h1 className={styles.title}>알림 {unRead}개</h1>
      {!unRead && <div className={styles.noAlarm}>새로운 알림이 없습니다.</div>}
      {!!unRead && (
        <div className={styles.notiContainer}>
          {alarms.map(alarm => {
            const { status } = alarm.item.application.item;
            let alarmImage;
            if (status === 'accepted') alarmImage = approveIcon;
            else if (status === 'rejected') alarmImage = rejectIcon;
            else if (status === 'canceled') alarmImage = cancelIcon;
            const resultAlarm = STATUS_LABEL[status]?.split(' ')[0];
            const timeAlarm = formatDateAndTime(
              alarm.item.notice.item.startsAt,
              alarm.item.notice.item.workhour,
            ).split('(')[0];
            const isRead = alarm.item.read;

            return (
              <div
                className={styles.notiBox}
                key={alarm.item.id}
                onClick={() => {
                  putAlarmRead(userId, alarm.item.id, token);
                  setCheckRead(true);
                }}
              >
                {!isRead && (
                  <Image
                    width={5}
                    height={5}
                    src={alarmImage}
                    alt='알림아이콘'
                  />
                )}
                <div className={styles.alarmMention}>
                  {alarm.item.shop.item.name}({timeAlarm}) 공고 지원이{' '}
                  <span
                    className={classNames({
                      [styles.accepted]: resultAlarm === '승인',
                      [styles.rejected]: resultAlarm === '거절',
                      [styles.canceled]: resultAlarm === '취소',
                    })}
                  >
                    {resultAlarm}
                  </span>
                  되었어요.
                </div>
                <div className={styles.created}>
                  {getFromTime(alarm.item.createdAt)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
