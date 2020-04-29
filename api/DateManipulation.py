# DateManipulation.py
# class to obtain some data in date format
# Cisco University Challenge Project
# @authors: Daniel Lepe, Alan Gonzalez, Christopher Ortega & Alberto Labrada
# Team: The Northerners
# 04/29/2020

import datetime


class DateManipulation:

    @staticmethod
    def get_date(string):
        # manipulate string to generate date with datetime format
        res = []
        splitted = string.split("-")
        day = splitted[2]
        dayFix = day.split("T")
        splitted[2] = dayFix
        for i in range(3):
            print(splitted[i])
            res.append(int(splitted[i]))

        return datetime.date(res[0], res[1], res[2])

    @staticmethod
    def date_diff_weeks(date1, date2):
        # generate date difference and translate that into weeks
        calc = date1 - date2
        calc_weeks = calc.days // 7
        return calc_weeks
