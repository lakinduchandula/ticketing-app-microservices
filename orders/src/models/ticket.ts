import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

import { Order, OrderStatus } from './order';

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  /**
   * findByIdAndPreviousVersion
   * Assumption here is passing event or data object this method will pull off the
   * id and version properties subtract 1 from the version and use that to run the
   * query below
   */
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDoc> | null;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set('versionKey', 'version');
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};

ticketSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

ticketSchema.methods.isReserved = async function () {
  /**
   * "this" === the ticket document that we just called 'isReserved' on
   */

  const existingOrder = await Order.findOne({
    ticket: this as any,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Completed,
      ],
    },
  });

  /**
   * "!!" means that if existingOrder is null then it it means
   * FALSE first ! will turn that into TRUE second ! will again
   * turn back to FALSE
   */
  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

export { Ticket };
