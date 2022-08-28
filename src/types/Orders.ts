export enum CHANNEL {
  SYSTEM = 'channel_system',
  SYSTEM2 = 'channel_test',
  SYSTEM_REGISTER = 'channel_register',
  SYSTEM_CALL = 'channel_call'
}
export enum CMD {
  TEST_CMD,
  TEST_CMD2,
}
export interface baseOrder {
  cmd: CMD
  script: string
  ext?: any
}

export interface sysOrder extends baseOrder {

}
