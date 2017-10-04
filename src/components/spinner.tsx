import * as React from 'react'
import * as spinner from '../assets/spinner.png'
import * as styles from './spinner.css'

interface Props {
  visible: boolean
}
export default (props:Props) => {

  return props.visible? (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
      </div>
    </div>
  ) : null
}