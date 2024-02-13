import moment from "moment";
import { defineStore } from "pinia";
import { supabase } from "src/boot/supabase";
import { useAuth } from "./auth";
import { useConfig } from "./config";
import { date } from "src/boot/moment";

export const useControl = defineStore("control", {
  state() {
    const auth = useAuth();
    const config = useConfig();
    return {
      auth,
      config,
      control: {
        userId: null,
        type: "expense",
        installments: false,
        repeat: "unique",
        ammount: null,
        duedate: moment().format("DD/MM/YYYY"),
        title: null,
        comment: null,
        description: null,
        installments: null,
        currentInstallment: null,
        currentMonth: moment().format("MM"),
        completed: false,
        repeatId: null,
        year: moment().format("YYYY"),
        recalculate_id: null,
        haveRecalculate: null,
      },
      defaultControl: {
        userId: null,
        type: "expense",
        installments: false,
        repeat: "unique",
        ammount: null,
        duedate: moment().format("DD/MM/YYYY"),
        title: null,
        comment: null,
        description: null,
        installments: null,
        currentInstallment: null,
        currentMonth: null,
        completed: false,
        repeatId: null,
        year: null,
        recalculate_id: null,
        haveRecalculate: null,
      },
      expenses: [],
      incomings: [],
      totalIncoming: 0,
      totalExpense: 0,
      month: {
        full: date().format('MMMM'),
        abbr: date().format('MMM'),
        num: date().format('MM')
      },
      year: moment().format("YYYY"),
      currentDate: moment().format("YYYY-MM-DD"),
      currentYear: moment().format("YYYY"),
     currentMonth: moment().format("MM"),
      totalExpense: 0,
      totalIncoming: 0,
      ammountPaid: 0,
      unpaidAmmount: 0,
      balance: 0,
      paidOut: 0,
    };
  },
  actions: {
    editedControl() {
      let newcontrol = {};
      Object.entries(this.control).forEach(([key, value]) => {
        Object.entries(this.defaultControl).forEach(([k, v]) => {
          if (k == key && v !== value) {
            if (key == "ammount") {
              newcontrol[key] = parseFloat(value.replace(",", "."));
            } else if (key == "duedate") {
              console.log(value);
              newcontrol[key] = `${value.split("/")[2]}-${value.split("/")[1]
                }-${value.split("/")[0]}`;
            } else {
              newcontrol[key] = value;
            }
          }
          if (key == "type" || key == 'completed') {
            newcontrol[key] = value;
          }

        });
      });

      newcontrol["userId"] = this.auth.user.id;
      return newcontrol;
    },
    async addControl(control) {
      console.log(control.duedate);
      let newcontrol = { ...control };
      newcontrol["month.num"] = moment(control.duedate).format("MM");
      newcontrol["duedate"] = moment(control.duedate).format("YYYY-MM-DD");
      newcontrol["year"] = moment(control.duedate).format("YYYY");

      if (control.installments > 1) {
        newcontrol = [];
        for (let i = 0; i < control.installments; i++) {
          let newc = { ...control };
          let dt = moment(new Date(control.duedate));
          newc["duedate"] = dt.add(i, "months").format("YYYY-MM-DD");
          newc["month.num"] = dt.format("MM");
          newc["year"] = dt.format("YYYYY");
          newcontrol.push(newc);
        }
      } else {
      }

      console.log(newcontrol);
      const { error } = await supabase.from("allcontrol").insert(newcontrol);

      console.log(error);
      return error;
    },
    async getAllControls(type) {
      try {
        const { data, error } = await supabase
          .from("allcontrol")
          .select()
          .match({ userId: this.auth.user.id, type: type })
          .or(
            `repeat.eq.fixed,and(currentMonth.eq.${this.month.num},currentYear.eq.${this.year})`
          );

        if (error) {
          throw new Error("Erro ao buscar dados no Supabase");
        } else {
          console.log("data ", data);
          return data;
        }
      } catch (error) {
        return { error };
      }
    },

    async getControls() {
      const expenses = await this.getAllControls("expense");
      const incomings = await this.getAllControls("incoming");


      this.expenses = expenses.reverse()
      this.incomings = incomings.reverse()
      this.totalExpense = expenses.reduce((acc, item) => {
        acc = acc + item.ammount;
        return acc
      }, 0)
      this.totalIncoming = incomings.reduce((acc, item) => {
        acc = acc + item.ammount;
        return acc
      }, 0)
      this.ammountPaid = expenses.reduce((acc, item) => {
        if (item.completed) acc = acc + item.ammount;
        return acc
      }, 0)
      this.unpaidAmmount = expenses.reduce((acc, item) => {
        if (!item.completed) acc = acc + item.ammount;
        return acc
      }, 0)
      this.balance = this.totalIncoming - this.totalExpense;
      this.paidOut = this.totalExpense - this.ammountPaid;

    },
    async changeMonth(type) {
      this.currentDate = moment(this.currentDate)
      [type](1, "months")
        .format("YYYY-MM-DD");
      this.month.num = moment(this.currentDate).format("MM");
      this.year = moment(this.currentDate).format("YYYY");
      this.month = moment(this.currentDate).format("MMMM");
      await this.getControls();
    },
    async current() {
      // console.log("ola");
      this.currentDate = moment(Date.now()).format("YYYY-MM-DD");
      // console.log(this.currentDate);
      this.month.num = moment(this.currentDate).format("MM");
      this.year = moment(this.currentDate).format("YYYY");
      this.month = moment(this.currentDate).format("MMMM");
      // console.log(this.month);
      await this.getControls();
    },

    async setMonth(newvalue) {
      const currentDay = moment(this.currentDate).format("DD");
      let month =
        this.config.months.indexOf(newvalue) + 1 <= 9
          ? "0" + (this.config.months.indexOf(newvalue) + 1)
          : this.config.months.indexOf(newvalue) + 1;
      this.currentDate =
        this.year + "-" + month + "-" + currentDay;
      // console.log(this.year + "-" + month + "-" + currentDay);
      this.month.num = month;
      this.month = newvalue;

      await this.getControls();
    },
  },
});