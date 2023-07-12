/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);
//引導頁跳主頁
document.getElementById("page1").addEventListener("click", function()
{
    window.location.href = "#home";
});
//監聽 回頂部按鈕 按下回頂部
document.getElementById("back-to-top-btn").addEventListener("click", function()
{
    window.scrollTo(
    {
        top: 0,
        behavior: "smooth" //順滑移到所需位置 不是直接跳到所需位置
    });
});
var mapLink = "https://www.google.com/maps?q=";
//監聽 查詢和找站名的 button 點擊Call funtion
document.getElementById("search").addEventListener("click", addData);
//創建儲存陣列
var bikeData = new Array(2);

for (var i = 0; i < bikeData.length; i++)
{
    bikeData[i] = new Array(100);
}
for (var i = 0; i < bikeData.length; i++)
{
    for (var j = 0; j < bikeData[0].length; j++)
    {
        bikeData[i][j] = new Array(5);
    }
}

function checkConnection()
{
    var networkState = navigator.connection.type;
    if (networkState === Connection.NONE)
    {
        alert("沒有網路連線...");
        navigator.app.exitApp(); // 離開應用程式
    }
}
//呼叫憑證 並傳值和Call function GetApiResponse(); TDX網站的範例示範 
function GetAuthorizationHeader()
{
    const parameter = {
        grant_type: "client_credentials",
        client_id: "A7223717-51369ba0-838c-45d1",
        client_secret: "131617cb-8e8d-447a-b4cb-07a419cd9bdd"
    };

    let auth_url = "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";

    $.ajax(
    {
        type: "POST",
        url: auth_url,
        crossDomain: true,
        dataType: 'JSON',
        data: parameter,
        async: false,
        success: function(data)
        {
            const accessTokenData = JSON.parse(JSON.stringify(data));
            GetApiResponse(accessTokenData);
        },
        error: function(xhr, textStatus, thrownError) {

        }
    });
}

//取得所需的資料
function GetApiResponse(accesstoken)
{
    var stName; //stName=stationName
    if (accesstoken != undefined)
    {
        //台北資料
        $.ajax(
        {
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/Taipei?%24select=StationName%2CStationPosition&%24top=100&%24format=JSON',
            headers:
            {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function(Data)
            {
                console.log("St1", Data.length);
                for (var i = 0; i < Data.length; i++)
                {
                    stName = Data[i].StationName.Zh_tw;
                    bikeData[0][i][0] = stName.split('_')[1];
                    bikeData[0][i][3] = Data[i].StationPosition.PositionLat;
                    bikeData[0][i][4] = Data[i].StationPosition.PositionLon;
                }


            },
            error: function(xhr, textStatus, thrownError)
            {
                console.log('errorStatus:', textStatus);
                console.log('Error:', thrownError);
            }
        });
        $.ajax(
        {
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/Taipei?%24top=100&%24format=JSON',
            headers:
            {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function(Data)
            {
                console.log("Rt1", Data.length);
                for (var i = 0; i < Data.length; i++)
                {
                    bikeData[0][i][1] = Data[i].AvailableRentBikes;
                    bikeData[0][i][2] = Data[i].AvailableReturnBikes;
                }
            },
            error: function(xhr, textStatus, thrownError)
            {
                console.log('errorStatus:', textStatus);
                console.log('Error:', thrownError);
            }
        });
        //新北資料
        $.ajax(
        {
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic/v2/Bike/Station/City/NewTaipei?%24select=StationName%2CStationPosition&%24top=100&%24format=JSON',
            headers:
            {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function(Data)
            {
                console.log("St2", Data.length);
                for (var i = 0; i < Data.length; i++)
                {
                    stName = Data[i].StationName.Zh_tw;
                    bikeData[1][i][0] = stName.split('_')[1];
                    bikeData[1][i][3] = Data[i].StationPosition.PositionLat;
                    bikeData[1][i][4] = Data[i].StationPosition.PositionLon;
                }


            },
            error: function(xhr, textStatus, thrownError)
            {
                console.log('errorStatus:', textStatus);
                console.log('Error:', thrownError);
            }
        });
        $.ajax(
        {
            type: 'GET',
            url: 'https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/NewTaipei?%24top=100&%24format=JSON',
            headers:
            {
                "authorization": "Bearer " + accesstoken.access_token,
            },
            async: false,
            success: function(Data)
            {
                console.log("Rt2", Data.length);
                for (var i = 0; i < Data.length; i++)
                {
                    bikeData[1][i][1] = Data[i].AvailableRentBikes;
                    bikeData[1][i][2] = Data[i].AvailableReturnBikes;
                }
            },
            error: function(xhr, textStatus, thrownError)
            {
                console.log('errorStatus:', textStatus);
                console.log('Error:', thrownError);
            }
        });
    }
}
//把資料加入網頁
function addData()
{
    var whichCity = document.querySelector("#city").value;
    if (whichCity == "Taipei")
    {
        $("#ubikeList").empty();
        for (var i = 0; i < bikeData[0].length /*100*/ ; i++)
        {
            $("#ubikeList").append(
                '<li class="ui-li-static ui-body-inherit">' +
                '<h1 style="display: inline;text-align:left">' + bikeData[0][i][0] + '</h1>' +
                '<a href="' + mapLink + bikeData[0][i][3] + ',' + bikeData[0][i][4] + '" target="_blank ">' +
                '<button data-role="none" style="display: inline;background:transparent;border-width: 0px" class="fa-solid fa-location-dot"></button>' +
                '</a>' +
                '<p>剩餘租借輛:' + bikeData[0][i][1] + '</p>' + '<p>可歸還位:' + bikeData[0][i][2] + '</p>' +
                '</li>'
            );
        }
    }
    else if (whichCity == "NewTaipei")
    {
        $("#ubikeList").empty();
        for (var i = 0; i < bikeData[1].length /*100*/ ; i++)
        {
            $("#ubikeList").append(
                '<li class="ui-li-static ui-body-inherit">' +
                '<h1 style="display: inline;text-align:left">' + bikeData[1][i][0] + '</h1>' +
                '<a href="' + mapLink + bikeData[1][i][3] + ',' + bikeData[1][i][4] + '" target="_blank ">' +
                '<button data-role="none" style="display: inline;background:transparent;border-width: 0px" class="fa-solid fa-location-dot"></button>' +
                '</a>' +
                '<p>剩餘租借輛:' + bikeData[1][i][1] + '</p>' + '<p>可歸還位:' + bikeData[1][i][2] + '</p>' +
                '</li>'
            );
        }
    }
    else alert("請選擇城市!!")
}
//搜尋站名
function scrollToItem(keyword)
{
    // 判斷是否選取城市
    var whichCity = document.querySelector("#city").value;
    if (whichCity === "default")
    {
        alert("請先選取城市資料");
        return;
    }
    var item = document.getElementById("item0");
    if (!item)
    { // 防呆：如果item不存在，跳過本次循環
        alert("請按****查詢按鈕****");
        return;
    }
    // 獲取列表項的ID和文本內容
    var hasItems = false;
    for (var i = 0; i < 100; i++)
    {
        item = document.getElementById("item" + i);
        var itemText = item.textContent.trim();
        // 判斷文本內容是否包含關鍵字
        if (itemText.includes(keyword))
        {
            // 使用scrollIntoView()方法滾動到對應列表項的位置
            item.scrollIntoView(
            {
                behavior: "smooth",
                block: "center"
            });
            hasItems = true;
            break; // 找到第一個符合的項目後即停止循環
        }
    }
    // 如果沒有找到任何符合的項目，顯示提示訊息
    if (!hasItems)
    {
        alert("找不到符合的項目");
    }
}


function onDeviceReady()
{
    checkConnection();
    GetAuthorizationHeader();

}