import { DownOutlined } from '@ant-design/icons'

//상단바 날짜
export function LogDate(handleButtonClick, upload_date) {
    let date = new Date();
    const todayYear = date.getFullYear();
    const todayMonth = date.getMonth() + 1;
    const todayDate = date.getDate();

    let [nowY, nowM, nowD] = upload_date ? upload_date : [todayYear, todayMonth, todayDate]
    // let nowY = upload_date[0]
    // let nowM = upload_date[1]
    // let nowD = upload_date[2]

    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let currentMonthName = monthNames[nowM - 1]

    return (
        <div className="date-box">
            <DownOutlined className="down-button" onClick={handleButtonClick}/>
            <h2>{` ${currentMonthName} ${nowD}, ${nowY} `}</h2>
        </div>
    )
}
