export const paymentToRenderMaker = (paymentFrom: number | null, paymentTo: number | null, currency: string): string => {
    let paymentToRender: string;
    if (paymentFrom && paymentTo) {
        paymentToRender = `з/п ${paymentFrom} - ${paymentTo} ${currency}`;
    } else if (paymentFrom && !paymentTo) {
        paymentToRender = `з/п от ${paymentFrom} ${currency}`;
    } else if (!paymentFrom && paymentTo) {
        paymentToRender = `з/п ${paymentTo} ${currency}`;
    } else {
        paymentToRender = 'з/п не указана';
    }
    return paymentToRender;
};