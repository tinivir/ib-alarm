const { broadcastMessage } = require('./ws');
const { sendEmail } = require('./email');

const { operators } = require('./operators');
const checkAlarms = async feeds => {
  for (const { data, alarms } of feeds) {
    for (const alarm of alarms) {
      if (operators[alarm.operator](data[alarm.indicatorName], alarm.value)) {
        await ringAlarm({ data, alarm });
      }
    }
  }
};

const ringAlarm = async ({ data, alarm }) => {
  const subject = `ALARM - ${alarm.contract.symbol} [${alarm.bar}] ${alarm.indicatorName} = ${
    data[alarm.indicatorName]
  }`;
  const text = `${alarm.indicatorName} = ${data[alarm.indicatorName]}`;

  broadcastMessage({ alarm: { subject, text, indicatorName: alarm.indicatorName } });
  try {
    // await sendEmail({ subject, text });
  } catch (e) {
    console.error(e);
    broadcastMessage({ error: `Email ${subject} is not send` });
  }
};

module.exports = {
  checkAlarms
};
