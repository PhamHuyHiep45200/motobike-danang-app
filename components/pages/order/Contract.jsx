import { FormatNumber } from '@/utils/FormatNumber'
import { Modal } from 'antd'
import moment from 'moment'
import React from 'react'

function Contract({data, user, open, closeContract}) {
  return (
    <Modal
        title={'Hợp đồng thuê xe'}
        footer={false}
        open={open}
        onCancel={closeContract}
      >
        <div className='flex items-start space-x-[10px] justify-between'>
            <div  className=' flex-1 text-center'>
                <span className='text-[14px] flex-1 font-bold'>CÔNG TY MOTOBIKE DA NANG</span>
                <p className='text-[12px] font-semibold'>Số 07895437574</p>
            </div>
            <div className=' flex-1 text-center'>
                <span className='text-[14px] text-center font-bold'>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
                <p className='text-[12px] font-semibold'>Độc lập - Tự do -  Hạnh phúc</p>
                <p className='text-[12px] font-medium text-[#666]'>Đà Nẵng ngày 20 tháng 08 năm 2023</p>
            </div>
        </div>
        <h1 className='font-bold uppercase text-center text-[15px]'>hợp đồng thuê xe</h1>
        <p className='font-bold text-[13px]'>Hợp đồng này được lập giữa các bên:</p>
        <p className='font-bold text-[13px]'>Bên A: {user?.name}</p>
        <p className='text-[13px] font-medium text-[#333]'>Email: {user?.email}</p>
        <p className='text-[13px] font-medium text-[#333]'>Số điện thoại: {user?.phone}</p>
        <p className='text-[13px] font-medium text-[#333]'>Chứng minh nhân dân: {data?.idCard}</p>
        <p className='font-bold text-[13px]'>Bên B: Công Ty MOTOBIKE DA NANG</p>
        <p className='text-[13px] font-medium text-[#333]'>Đại diện: ông Phan Văn Nghĩa (giám đốc công ty)</p>
        <p className='text-[13px] font-medium text-[#333]'>Địa chỉ: 80 Cao Bá Quát</p>
        <p className='text-[14px] font-semibold'>2 bên thống nhất các điều khoản dưới đây:</p>
        <p className='text-[13px] font-semibold block mt-[10px]'>Điều 1: Tài sản cho thuê</p>
        <p className='text-[13px] font-medium text-[#333]'>Loại xe : {data?.motoOrder?.CategoryMoto?.name}</p>
        <p className='text-[13px] font-medium text-[#333]'>Tên xe xe: {data?.motoOrder?.name}</p>
        <p className='text-[13px] font-medium text-[#333]'>Biển số xe xe: {data?.motoOrder?.licensePlates}</p>
        <p className='text-[13px] font-medium text-[#333]'>Giấy tờ xe xe: {data?.motoOrder?.licensePates}</p>
        <p className='text-[13px] font-medium text-[#333]'>Màu xe: {data?.motoOrder?.color}</p>
        <p className='text-[13px] font-medium text-[#333]'>Địa chỉ nhận xe: {data?.receivingAddress}</p>
        <p className='text-[13px] font-medium text-[#333]'>Địa chỉ trả xe: {data?.giveCarAddress}</p>
        <p className='text-[13px] font-medium text-[#333]'>Gía xe cho thuê: {FormatNumber(data?.allMoney)}đ</p>
        <p className='text-[13px] font-medium text-[#333]'>Gía xe cọc trước: {FormatNumber(data?.depositPrice)}đ</p>
        <p className='text-[#111] font-semibold text-[14px]'>Bên A cam kêt photo hoặc sao chép và cung cấp bản gốc đăng ký xe của bên A để đối chiếu với bản photto nhằm chứng minh tính hợp pháp của tài sản cho thuê.</p>
        <p className='text-[13px] font-semibold block mt-[10px]'>Điều 2: Thời gian thuê</p>
        <p className='text-[13px] font-medium text-[#333]'>Thời gian bắt đầu thuê: {moment(data?.rentalStartDate).format('HHH:mm - DD/MM/YYYY')}</p>
        <p className='text-[13px] font-medium text-[#333]'>Thời gian kết thúc thuê: {moment(data?.leaseEndDate).format('HHH:mm - DD/MM/YYYY')}</p>
        <p className='text-[#111] font-semibold text-[14px]'>Trong thời gian thuê, nếu khách hàng trả trước xe hoặc trả muộn xe thì bên B sẽ dựa vào số ngày thuê thực tế mà tính tiền thuê xe</p>
        <div className='flex items-start justify-between my-[20px]'>
            <div className='text-center'>
                <span className='text-[14px] font-bold'>Bên A</span>
                <p className='text-[12px] text-[#111]'>Ký tên</p>
                <p className='text-[13px] font-bold'>{user?.name}</p>
            </div>
            <div className='text-center'>
                <span className='text-[14px] font-bold'>Bên B</span>
                <p className='text-[12px] text-[#111]'>Ký tên</p>
                <p className='text-[13px] font-bold'>Phan Văn Nghĩa</p>
            </div>
        </div>
      </Modal>
  )
}

export default Contract