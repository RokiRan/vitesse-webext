export enum CHANNEL {
  SYSTEM = 'channel_system',
  SYSTEM2 = 'channel_test',
  SYSTEM_REGISTER = 'channel_register',
  SYSTEM_CALL = 'channel_call',
  SYSTEM_OPEN_ASIDE = 'open_aside',
  SYSTEM_TEST_SPIDER = 'test_spider',
  SYSTEM_RESPONSE = 'response_data',
  ODD_POST = 'odd_post'
}
// export enum CMD {
//   TEST_CMD,
//   TEST_CMD2,
//   GET_DATA
// }
export interface baseOrder {
  cmd: 'response' | 'exc' | 'odd'
  script: string
  ext?: any
  id?: string
}

export interface sysOrder extends baseOrder {

}
