
import Moment from 'moment'

/**
 * 日期格式化
 * @param value {String} 日期-时间戳
 */
export const date= (value,rule='YYYY-MM-DD HH:mm:ss')=>{
  return value?Moment(parseInt(value)).format(rule):''
}
