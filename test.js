'use strict';

const handler = require('./lambda/index').handler;

// expected JSON
const answers = {
  "connectionIndicator": true,
  'gitRemoteProtocol': "HTTPS",


  "cli": true,
	"adapterName": "adaptername",
	"title": "My Tests",
	"description": "User tries to test adapter creator",
	"features": [
		"adapter"
	],
	"adminFeatures": [],
	"type": "date-and-time",
	"startMode": "daemon",
	"language": "JavaScript",
	"tools": [
		"ESLint",
		"type checking"
	],
	"indentation": "Space (4)",
	"quotes": "single",
	"es6class": "no",
	"authorName": "Bluefox",
	"authorGithub": "GermanBluefox",
	"authorEmail": "dogafox@gmail.com",
	"gitCommit": "no",
	"license": "MIT License",
	"icon": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAScwAAEnMBjCK5BwAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAABAySURBVHhe7V0JdBXVGQa3tlZFyZs3CaSlLqilHjV5uBRrY+bOS1Jr0bZQXOixiweoigrJ3HkB67PqoXVrSykkoS5oUQu29VStuGFre6xAAJeKG8cFW611xbYqCCT97ssfmoZLuLO9WTLfOd8Jj+R9995/vrnb3Ll3SIoUKVKkSJEiRVJx7NwV+x3dtnb02I5V42oXrm7MLeycUNu28qyaBau+KX6KzzXtK5vGdqwdd8zClYfmOlYPo6+miCtybZ0n1bZ3PoaLuRHsdkp8971cR+fjMIxBkimihsr62aOyzJqimfZtWWbPoP8uARfwTNmFdUpRS5BkCbrJz9eYvSSb51P1fPOB9N8pyoWs0XqkxqwrNMb/mjXt7j6cQ39SQmAGyFuX9k1XM/m6DNLOMLuG/iSF36hsatVwx83Enf5E3+D3YygG6EvUDE/BnBZMqtOfp/ACcVdlTX4TArtJFvB+DN0A28n4ZtQMi6saCjn6WgonyBjWibjb75cGd+eMjgH6EE3Vct2w6unrKQZCpWmNxd3u9ML3MpIG6KXGCsv1fOE4kknRFxWmNUJU9ag6u2TBU2SkDdBD3oUa4ZaRTbya5AY5Jk7cXWf8Agzh3pMHzBFjYIBe8n/D7DOH1BX3INnBh6qG1sNR3T8qD5ArxsgARGZ36o38cyQ9aDBUN+zz0Ml7XxoU94yfAUCMFj7MGvyiIUO6h1ISycWwugv3Rxv4W1kgfGAsDdBLxOXO6obicEomedDzzUeg3VsvK7xPjLUBBGGCF7UG+yhKKjnQmXWKTx29gRh7AwiiX/SfrNF6GiUXf2RNaxru/K2ywvrMRBigRMa3idERJRlf4K6/WFrAYDigAfB5M7gBXFPbvvoPtW2dy3LtnXfh8z3ic66jc3Vt+6oNtR2rN/X9XigGIKKDeDklGz/AxT+UFSpA/r8BFqzJ1batulA8zz924YrqiUuX7k6/GhDFYvdux7c9NhLGqIdBpte0rxxLvyqhnAYQhAl+jGTjNUJAxuf0L0iQLLWbpn0OJR8oKvP87NJEjiQfQRGdw2so+ehDN21bVgj/ybs0034ga9iTMcL4JCVfFlSdUtwbfZszkIf7wG3y/PnOSyj56ELL299CRr3M5++SuNs/wM/5GVY4lJINFVpD4RCY4Ge4S/2e2NqReT6Vko0ecEcwtFcfSTPuA8WMmZbn1zhZbFH386f2yf3isRNq2jqn5trXXI2O3q+ow/c4+Dz+/YL4KT6jzf8j2vwl+HkNfk5DB/AL4657Zl+S2iVKi1ZM+0rkUxhUWgbv5Fs01tJESUYHWlPLwej0vS3PtGeKJ2i3VtY3j6LklJBbuPZUXMytfXv0Tonvb6tpX/M1klSCeNKHWNwsmihJWfzgxopG6zBKLnyI9nAXS7Xck/H1et52tSoXFy+QeQBVZPL2F2GCZ6Xl8kjEe13FeEu5dgoUKOT1skx6ZFeG2fOEuSgZxwjbAAKj6oofF8M4UZ5+5fNMzeCLKZnwoOf56bLMeSKz39YN+yuUhGtEwQC9EO027to3peX1QDSNZ1MS5cdwY9ZIcbFkGXNLFOjJLCscREl4QpQMIFB6h8Hga2Xl9sCNVab9aUqivEBh7pJkyD2ZdW/FOP/atagZQEDMV6BJuFNaftfk90G6vDOFGZN/Q54ZdxTtWS43ZU+S9wVRNEAJdcU9UHPeIIuDW2qm5W8eB4LofaIAr8oy4ooIhlgbSPK+IbIGECgWd9OY3S6Nhwuif/E6Opz7k3qwyJqWb/P8YnwfxMUXiLQBBLq7hyIGi/rHxC3FaIOUg4PocIgZOVkGnBKuvT+X6/C12u+LyBsAqCs1B/xuWXwck/HNfnWgdwqMzX1pu2CidQeYdqDv4MfBAAKi44t4+DKRhhr1FpL1H/TQY4ssYYfcOKIMD3LiYgABPT/7QF+G1IxvqzT5Z0nWX6CneZ00UYdEj38CSQaKOBlAAH2r8YiP9xlDxm8mSf+QaZxVhV6ryhu6uyC/niQDR9wMIIAYzd8xZk7Jt/g+OaSxwg/kiTkg4xuGN03fjyQDRxwNoNUV90F/4AVp/JyQ2VeSpHeMmVjcC6L/2CERp2Qtp5JkWRBHAwjAAI3S+Dkgaus3xYMokvQGiH1dlogTond6N8mVDXE1gADi5f3tKcbPJDlvQJvibe6a8a2B9UwHQKwNUD/7YJjA6+oq8YzAG6rqZmZQJXnKiJg7ILmyIs4GEEDN2yaLpzJx42knt1SSnDtA6JwdhB2Rb9HqWw4mubIi7gYozbp6rAXQeT+X5NwBLvq9TFiZzFpCUmVH3A0ggBvoJmlcFYla5EGSco7qCTM+oZmlJdhScRVq+ZYTSK7sSIIBxJ5JsriqEs33ZtdDb6/DEVRfT5JUKEiCAQRQC6+WxVedhfEk5Qz44lVyQVVazSQVCpJiAC1vnyePrxpxI/6UpJwB7ccKmaAiu0Y0zPwUSYWCpBhAzxezokcvibEi+VqSUkdpObN4viwV3DXx3RUkFRqSYgABXMQ/yeKsRGZvFVPMJKWGSlY4RiqmSsa/T1KhIUkG0EzL0wu3YudVklID2m9v439W+DxJhYYkGSDTOKtWGmdFokN/PkmpQWf2T2RCKkT1/754gERSoSFJBhDrJlGrut9jifEFpKQGtDnLpEIqZPYjJBMqEmUAANdkuTTeCsRNuZxk1IAvPddfRJ18PsmEiqQZQDPta+Xx3jXRBLxEMgro7h6KL7he+Qu3fY+UQkXSDKAb/LuyeKuRbxkyUW2PpCEjWKFCLqJIg+dJKlQkzQA9r5tL4q1IsayPpAZGRV3r4TIBVUZl65bE1QCN9mdk8Vam0XokSQ0MrYGPkwoo8pCmYtnW/Q2EpBlATM7J4q3KSrO1jqQGRraB52UCSmT8o6jsep00AwiIIbY07grU84p7LoinRzIBJTL+DsmEjkQawOSvS+OuQPFGN8kMDC1vTZQJKJHx10gmdCTRAIjxKzvEXJWqi0Qr8wUPBrBfJZnQkRqgH1nhLJIZGFnDOk0qoEDN4G+RTOhIpAFQw8rirkKdFSaRzMDwshIInZRNkEg7gQEB8XX/PAA3NskMjIzReqJUQJFiLSFJhYqkGUBsoZP1sPmk8n6L4hQrmYAqxYQFSYWKpBmg2pgxUhZvVSofY6vVtVTKBFSZaWx1tvggICTNALj7j5fFW5UjGmYrLtGbuHR38fBAJqJC9CG+TUqhInEGwDBOFm8lMr7N0RoNXMSXpUIqZNbVJBMqkmYA3SxcLo23Cp3Oz+BLD+0gokix+RPJhIqkGQAjAC8v6TpbpIOL6HoPO43Zb4t98EgqNCSwCfCwRwO/kWTUUDrQWSqkRr0+/PNwk2SAng265LFWocYsi6TUUMHsk2RCqkQtMJ2kQkOSDJA1+FRZnFXp+JSRg0x7GKoNL4chLSOp0JCoGoDZv5PEWJniOBuSUgc6HetkYkpkfHPQG0HuCkkxQGmHcS8HUjG+nqScAa7ztJkxMh3eYQZAYgzACpNk8VWm2x1adI9bwsNA7jcn8AFJMQBieU//2DqhVu9yK/nS6mBmu38rlfGujGmNJrmyIwkGKJ0y4uUaiLOXVFcDywCBR/oJOiKGk+7eTfcBSTBAlhV+JIurMhlfQ1LuoBne3koF//XpLxcOILmyIu4GGN5U3A8jsXclMVWn17e0xf7zUmEHhIkuI7myIu4GwMWfLYunE1Y1tB5Ocu6hmfwvMnFlMvs9V+NQj4izAYah1sTd+440nur0Vv33ImsWpknEnZHZ80iubIizAby8CNrLjMkvIjlvEBM6niYiSuRbtAb7KJIsC+JqgEqjeQzi7W2DSJN/KEZxJOkdcGSHLCEnRKFWBHVAlAyxNECxuBti5X4/oP9xESn6g551gt5Pw9bynJNk4IijAbKGfaEsbk6pvP7PCdCOe5qRKpHZmzLMriHJQBE3A+j55iNQ03rambVEp7uBqELLt54gTdApGV9fjgdFcTJA6aQQZj8tjZdD6kZrPcn6D8207pcl6pToD9wZdH8gNgYQ7T6zfiOLk2My/jCpBgPd4MciIV/OwhdDHZINBHExgK8nsaKWJtngoDN+qyxxlwxsP+E4GEBn9nRJTNwRtQjJBgs6yMDjvMB2dkErkE2lom4AdIa/gyrby6qr7RTj/rIezKGbdkGWEXfkXWIRKkn7higbANX+NJTbl4vfQ14k6fIgN6VjT9y5T8oz447oE1zm5/YyETXAUAyFL5aV3z35M74dEecEPadZ+HKW8HbCVLdUH+/P28VRM8AhTdM/hjL6dlx8iWKxCGsJb19mZOKSHTLllYyv8eMY9CgZoPLk2aMwhF4pLa8nWnMoiXAgzr/PGPzP8sx54rswgqeDD6NiAE1suePHyeD9yfgK0RRTMuFhZBOvRi/0DWkmvfN28bo6JeUIYRtAzzdn0a+5TVIm74ShoH8gJRU+xO4TfvcH+vBdMV4WtQ0lp4SxC1Ydkevo/CW4DmbYIru4O2Pp79s7n8Z3F9fMf1Rth81eIJ9iaIs71OuCDjkxdHT8pk854OukhoSoZZ7VDGuimxdPxxSX7nV029rRtQtWG7m2zjNq2ldOw0Vurm1b3Sp+1rR3is9n4v/ZcTesHT1m6VMuzjvoHpo17K8in+5fqFEg9FsowegBVd5cWab9JALwBAI9OQqHUgj07N1jnYEacK0sv34S8W2nZCOKnpMtlsoy7zsZfw0968v8GDG4Qc/mzbwIQ/5dmj+fiXTuEM0LJR9diDszyyzvaweUybs0Zj8qqsYRjdZhlI1AIF50yeb5TKT7iEh3x7wEQ83gD4Qy2eMWYjIHPdV7ZYUJmqgmX0baN2vMOhc95eMcH5lGEC9liqefpQ6daS+CyV7sn1Y5iPSXV51S3JuyFR/Q2YOeXmv2h6U79W+gWGt3G8wxDx3WK1BLXYzfzcbni3s+2/NKvzf5w2heXgHLdofvlMy+Jyr7LrqCGLohkDdKC5dyQIpp8ah0dD2ieyiq40tRqPDvqJgQfY05UdhnyVegPT0drvZrHUEiif7LB5pZ8PPpY7Qgzq1Bu/a8rPCDnRjFvCBOCKVQJRcV4619UdjFsiAMWjJ7Sdhb6pQdGWZNQo/7LWlABgvFU8K8PZlCMviAJkEP7IlZ9Hl7hWmNoFAMbojDJnE3+PJiRPTJn6vM8y9R0VP0QjxUEbN3GCm4PhkrykS53tDz/IKEjO2DA70mZSFg/5QFMm4UFz5rWLNE55eKmEIFYv5bM+zz0DQ8Kwts5Mn4+gzjF4hnClSkFK4g3p0rnWbKf42gbpYGOyLE3f4ROrV3aA2FpsTN5EUBPXsXFqYg0A/CEEEtQXNGxrfioj8kttKpqpuZoaymCBrVDTOGl1biMPsGGOIl6cUJiEhvA34uyjLrLF+3YknhHuJQJHE+Li7MleCy0roAr69flRZg4mKLtQ3Mvlpn1qTK+uZRlGSKqEMsTBGrhFBTMHG3ip2z0CMXL7MIk8zN5ktrAObCKFfh5yUZA7/P25OzrMUUe+xVT7g2vs/iU6RIkSJFihQpdoohQ/4LzXiUu4oWB1kAAAAASUVORK5CYII=",
	"parameters": [
		{name: "option11", type: "checkbox", title: "option 11 description", def: true},
		{name: "option22", type: "number", title: "option 22 description", def: 43}
	],
	"connection": "yes"
};

console.log(JSON.stringify(answers));

if (module.parent) {
		module.exports = handler({body: JSON.stringify(answers)});
} else {
		handler({body: JSON.stringify(answers)}).then(result => {
      console.log(JSON.stringify(result));
		});
}
