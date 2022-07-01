export enum CHANNEL{
  SYSTEM = 'channel_system',
}
export enum CMD {
  TEST_CMD,
  TEST_CMD2,
}
export interface baseOrder{
  cmd: CMD
  script: string
  ext?: any
}

export interface sysOrder extends baseOrder{

}
