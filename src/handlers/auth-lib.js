
function init() {
    const fp = FingerprintJS.load()

    fp.then(fp => fp.get()).then(result => {
        window.fingerPrint = result.visitorId
    })

}

class TUCMCAuth {

    constructor(TOKEN) {
        this.TOKEN = TOKEN
        this.prevPop = null
        window.addEventListener("load", () => {
            document.getElementById("login_with_TUCMC").addEventListener("click", () => {
                this.signin()
            })
        })
    }

    signout() {
        window.localStorage.setItem("data","")
        window.location.reload()
    }

    _setLoading() {
        document.getElementById("login_with_TUCMC").innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"margin: auto; shape-rendering: auto;width: 40px; height: 26px\" viewBox=\"0 0 100 80\" preserveAspectRatio=\"xMidYMid\">\n" +
            "    <circle cx=\"84\" cy=\"50\" r=\"10\" fill=\"#ffffff\">\n" +
            "        <animate attributeName=\"r\" repeatCount=\"indefinite\" dur=\"0.7142857142857142s\" calcMode=\"spline\" keyTimes=\"0;1\" values=\"10;0\"\n" +
            "                 keySplines=\"0 0.5 0.5 1\" begin=\"0s\"/>\n" +
            "        <animate attributeName=\"fill\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"discrete\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"#ffffff;#ffffff;#ffffff;#ffffff;#ffffff\" begin=\"0s\"/>\n" +
            "    </circle>\n" +
            "    <circle cx=\"16\" cy=\"50\" r=\"10\" fill=\"#ffffff\">\n" +
            "        <animate attributeName=\"r\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"0;0;10;10;10\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"0s\"/>\n" +
            "        <animate attributeName=\"cx\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"16;16;16;50;84\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"0s\"/>\n" +
            "    </circle>\n" +
            "    <circle cx=\"50\" cy=\"50\" r=\"10\" fill=\"#ffffff\">\n" +
            "        <animate attributeName=\"r\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"0;0;10;10;10\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"-0.7142857142857142s\"/>\n" +
            "        <animate attributeName=\"cx\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"16;16;16;50;84\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"-0.7142857142857142s\"/>\n" +
            "    </circle>\n" +
            "    <circle cx=\"84\" cy=\"50\" r=\"10\" fill=\"#ffffff\">\n" +
            "        <animate attributeName=\"r\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"0;0;10;10;10\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"-1.4285714285714284s\"/>\n" +
            "        <animate attributeName=\"cx\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"16;16;16;50;84\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"-1.4285714285714284s\"/>\n" +
            "    </circle>\n" +
            "    <circle cx=\"16\" cy=\"50\" r=\"10\" fill=\"#ffffff\">\n" +
            "        <animate attributeName=\"r\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"0;0;10;10;10\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"-2.142857142857143s\"/>\n" +
            "        <animate attributeName=\"cx\" repeatCount=\"indefinite\" dur=\"2.8571428571428568s\" calcMode=\"spline\" keyTimes=\"0;0.25;0.5;0.75;1\"\n" +
            "                 values=\"16;16;16;50;84\" keySplines=\"0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\" begin=\"-2.142857142857143s\"/>\n" +
            "    </circle>\n" +
            "    </svg>"
        document.getElementById("login_with_TUCMC").style.padding = "0.15rem 4.71rem"
        setTimeout(( )=> {this._resetLoading()}, 3*60*1000)
    }

    _resetLoading() {
        document.getElementById("login_with_TUCMC").innerHTML = "Login with TUCMC"
        document.getElementById("login_with_TUCMC").style.padding = "0.5rem 2rem"
    }

    signin() {
        const data = window.localStorage.getItem("data")
        if(data) return
        if (this.prevPop) this.prevPop.close()
        this._setLoading()

        const wid = window.open("about:blank","_blank", "width=492,height=740")
        this.prevPop = wid

        async function _fetchToken(token) {
            const res = await fetch(`https://account.triamudom.club/api/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: "fetchAuthToken",
                    authToken: window.sessionStorage.getItem("authToken"),
                    reqToken: token,
                    fp: fingerPrint
                }),
                credentials: 'include'
            })

            const jsonResult = await res.json()

            if (jsonResult.status) {
                window.sessionStorage.setItem("authToken", "")
                window.localStorage.setItem("data", JSON.stringify(jsonResult.data.data))
                window.location.reload()
            }
        }

        const inter = setInterval(() => {
            if (this.prevPop.closed) {
                _fetchToken(this.TOKEN)
                clearInterval(inter)
            }
        }, 500)

        async function _genToken(token) {
            const res = await fetch(`https://account.triamudom.club/api/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: "genAuthToken",
                    reqToken: token,
                    fp: fingerPrint
                }),
                credentials: 'include'
            })

            const jsonResult = await res.json()
            return jsonResult
        }

        _genToken(this.TOKEN).then(jsonResult => {
            if(jsonResult.status) {
                window.sessionStorage.setItem("authToken", jsonResult.data.authToken)
                wid.location.replace(`https://account.triamudom.club/auth?authToken=${jsonResult.data.authToken}`)
            }
        })
    }

    user() {
        const data = window.localStorage.getItem("data")

        if (data) {
            const parsed = JSON.parse(data)
            return parsed.data
        }else{
            return null
        }
    }
}
