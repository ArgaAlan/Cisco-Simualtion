# Markov.py
# official class for creating markov chain and simulation
# Cisco University Challenge Project
# @authors: Daniel Lepe, Alan Gonzalez, Christopher Ortega & Alberto Labrada
# Team: The Northerners
# 04/29/2020

import random
from .DateManipulation import DateManipulation


class Markov:

    # transition matrix: lifecycle of a single component
    # 1. S -> P(next week component will have no problems) -> "ticket_ok" (this means no ticket)
    # 2. FT -> P(next component will not arrive on time) -> "ticket_fail_time""
    # 3. FQ -> P(next component will arrive with low quality) -> "ticket_fail_quality"
    # 4. FC -> P(next component will arrive without the quantity desired) -> "ticket_fail_quantity"
    #
    # matrix example
    # ___| S  | FT | FQ | FC
    # S  |
    # FT |
    # FQ |
    # FC |

    S = 0

    def __init__(self, start_date, no_of_weeks):
        self.start_date = start_date
        self.no_of_weeks = no_of_weeks
        self.transition_matrix = []

    def generate_matrix(self, ticket_list):
        matrix_observations = [[0, 0, 0, 0],
                               [0, 0, 0, 0],
                               [0, 0, 0, 0],
                               [0, 0, 0, 0]]

        # TODO: Alan haz que pueda referenciar a los tickets y acceder a esos métodos, y con eso creo que ya se puede probar todo
        # PARAMETER INFO:
        # ticket_list, is the input of a list of tickets, should have access to the following methods of the ticket
        # ticket.initialDate: string of format (YYYY-MM-DD)
        # ticket.finalDate: string of format(YYYY-MM-DD)
        # ticket.reason: string, needs to be converted into the one of the 4 options: "ticket_ok", "ticket_fail_time", "ticket_fail_quality", "ticket_fail_quantity"

        i = 0
        while i < len(ticket_list):

            ticketstartdate = DateManipulation.get_date(
                ticket_list[i].initial_date)
            ticketfinaldate = DateManipulation.get_date(
                ticket_list[i].final_date)

            if (i > 0):
                weeks_passed_start_date_start_date_ticket = DateManipulation.date_diff_weeks(
                startdate, ticketstartdate)

                matrix_observations[S][S] += weeks_passed_start_date_start_date_ticket - 1
                ñ
            reason_index = self.statustoindex(ticket_list[i].reason)
            matrix_observations[S][reason_index] += 1

            weeks_passed_start_date_ticket_final_date_ticket = DateManipulation.date_diff_weeks(
                ticketstartdate, ticketfinaldate)
            matrix_observations[reason_index][reason_index] += weeks_passed_start_date_ticket_final_date_ticket - 1
            matrix_observations[reason_index][S] += 1

            startdate = ticketfinaldate
            i += 1

        for i in range(len(matrix_observations)):
            list_row = []
            for j in range(len(matrix_observations[i])):
                list_row.append(
                    matrix_observations[i][j] / sum(matrix_observations[i]))
            self.transition_matrix.append(list_row)

    def statustoindex(self, str_status):
        if str_status == "ticket_ok":
            return 0
        if str_status == "ticket_fail_time":
            return 1
        if str_status == "ticket_fail_quality":
            return 2
        if str_status == "ticket_fail_quantity":
            return 3
        else:
            return -1

    def indextostatus(self, index):

        valstr = ""

        if index == 0:
            valstr += "ticket_ok"
        elif index == 1:
            valstr += "ticket_fail_time"
        elif index == 2:
            valstr += "ticket_fail_quality"
        elif index == 3:
            valstr += "ticket_fail_quantity"
        else:
            valstr += "ticket_ok"

        return valstr

    def nearest(self, row, prob):
        # Markovian property: "the conditional probability distribution of future states of the process (conditional on both past and present states) depends only upon the
        #   present state"
        # given prob (random) get probability in current row (which is the current state) that its closer to the value
        # returns index of that probability, which indicates the next state
        nearest = 1.0
        ans = -1
        for j in range(len(self.transition_matrix[row])):
            current_value = self.transition_matrix[row][j]
            if current_value == 0:
                continue
            diff = abs(current_value - prob)
            if diff < nearest:
                nearest = diff
                ans = j

        return j

    def simulate(self, status):
        # main simulation, is set to simulate for the number of weeks from user's input
        output = []
        current_status = status
        next_status_index = self.statustoindex(current_status)
        i = 0
        while True:
            output.append(self.indextostatus(next_status_index))
            prob = round(random.random(), 1)
            next_status_index = self.nearest(next_status_index, prob)
            i += 1
            if (i > self.no_of_weeks):
                break

        return output

# Example and usage
# 1. create a Markov instance with an initial date and number of weeks
# 2. access markov generate the transition matrix method with ticket list as parameter
# 3. make the simulation, needs one initial ticket status as parameter
# markov = Markov("2020-05-22", 8)
# markov.generate_matrix([])  # here goes ticket list
# markov.simulate("ticket_ok")
