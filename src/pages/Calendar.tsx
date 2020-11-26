/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import moment from 'moment'
import "moment/locale/pt-br"
import "./Calendar.sass"
import {Moment} from "moment";
import {Almoco} from "../DAOs/AlmocoDAO";

const Calendar = ({app} : {app: Realm.App}) => {
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
    const wks = ["1", "2", "3", "4", "5"];

    const [weeks, setWeeks] = React.useState({1: [], 2: [], 3: [], 4: [], 5: []});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentMonth, setCurrentMonth] = React.useState(moment(new Date()).add(1, 'month'));
    const [almocos, setAlmocos] = React.useState<any>([])

    React.useEffect(() => {
        let weeksAux = {...weeks};
        for (let j = 1; j < 6; j++) {
            const week = [];
            let x = moment(new Date()).add(1, 'month').startOf('month').startOf('week').add(j - 1, 'weeks');
            for (let i = 0; i < 7; i++) {
                // @ts-ignore
                week.push(moment(x));
                x.add(1, 'days');
            }
            weeksAux[j+""] = week;
        }
        setWeeks(weeksAux);
    }, []);

    React.useEffect(() => {

        app.currentUser?.callFunction("getAlmocos").then(result => {
            setAlmocos(result)
        });
    }, [])

    const getAlmocoFromThatDay = (day : Moment, almocos : Array<Almoco>) : Almoco | null => {
        for (let almoco of almocos) {
            if (day.isSame(new Date(almoco.dia), 'day')) {
                return almoco;
            }
        }
        return null;
    }

    return (
        <div>
            <h1>Calendário de Almoço</h1>
            <p> Mês de {moment(new Date()).locale('pt-BR').add(1, 'month').format('MMMM')} - <i>Ala Guarany</i></p>
            <table className={'calendar_table'}>
                <thead>
                {weekDays.map((weekday) => (<td key={weekday}>{weekday}</td>))}
                </thead>
                <tbody>
                {wks.map(wk => (
                    <tr>
                        {weeks[wk].map((day: Moment) =>
                            (<td
                                className={day.isSame(currentMonth, 'month') ? '' : 'not_month'}
                                onClick={() => {
                                    let nome = prompt("Informe o nome da Família");
                                    if (nome && nome !== '') {
                                        let telefone = prompt("Informe um Telefone para Contato");
                                        // setAlmocos([...almocos, ])
                                        const almoco = {
                                            nome: nome,
                                            telefone: telefone,
                                            dia: day.add(3, 'hours').toDate()
                                        }
                                        app.currentUser?.callFunction("insertAlmoco", almoco).then(res => {
                                            console.log("Adicionado com sucesso", res);
                                            app.currentUser?.callFunction("getAlmocos").then(res => {
                                                setAlmocos(res)
                                            })
                                        })

                                    }
                                }}
                                key={day.format('DD/MM')}>
                                {day.format('DD')}
                                <p><b>{getAlmocoFromThatDay(day, almocos)?.nome}</b></p>
                                <p><i>{getAlmocoFromThatDay(day, almocos)?.telefone}</i></p>
                            </td>))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

Calendar.propTypes = {}

export default Calendar