# bayesnet.py
# official python module for creating simulation
# Cisco University Challenge Project
# @authors: Daniel Lepe, Alan Gonzalez, Christopher Ortega & Alberto Labrada
# Team: The Northerners
# 05/21/2020

import random

# Bayesian Network to determine 
# Events: 
# 	A. Probability product will fail due Material Lead Time Risk: Transport Issue
# 	B. Probability product will fail due Material Lead Time Risk: Demand Surge
# 	C. Probability product will fail due Material Lead Time Risk: Product Design Change
# 	D. Probability product will not fail on Material Lead Time stage
# 	E. Probability product will fail due Material Quality Risk: Manufacturing Issue
# 	F. Probability product will fail due Material Quality Risk: Design Issue
# 	G. Probability product will fail due Material Quality Risk: Process Issue
# 	H. Probability product will fail due Material Quality Risk: Training Issue
# 	I. Probability product will not fail in Material Quality Stage
# 	J. Probability product will fail due Material Quantity Risk: Yield Issue
# 	K. Probability product will fail due Material Quantity Risk: Scrap due to ECO
#   L. Probability product will not fail at Material Quantity Stage
#   
#   Network:
#   START
#     |
#   MLT RISK
#      |
#   MQuant RISK
#       |
#   MQuality RISK

def simulate():
    # main simulation
    mlt_risk = [[0.20, 0.20, 0.10, 0.50]]
    mqnt_risk = [[0.30, 0.30, 0.40],[0, 0, 1]]
    mqlt_risk = [[0.10, 0.05, 0.25, 0.40, 0.20], [0,0,0,0,1]]

    output = []

    # First random probability value (Material Lead Time)
    rand = random.random()
    failure = 0
    l = 0
    u = 0
    i = 0
    probs = mlt_risk[failure]
    p_noerror = probs[-1]
    for p in probs:
        u += p 
        if l < rand and rand <= u:
            if i == 0 or i == 1 or i == 2:
                failure = 1
            if i == 0:
                output.append('Fail due Material Lead Time Risk: Transport Issue')
                break
            elif i == 1:
                output.append('Fail due Material Lead Time Risk: Demand Surge')
                break
            elif i == 2:
                output.append('Fail due Material Lead Time Risk: Product Design Change')
                break
            elif i == 3:
                output.append('No errors in Material Lead Time')
                break
        i += 1
        l = u

    # Second random probability value (Material Quantity)
    rand = random.random()
    l = 0
    u = 0
    i = 0
    probs = mqnt_risk[failure]
    p_noerror = probs[-1]
    for p in probs:
        u += p 
        if l < rand and rand <= u:
            if i == 0 or i == 1:
                failure = 1
            if i == 0:
                output.append('Fail due Material Quantity Risk: Yield Issue')
                break
            elif i == 1:
                output.append('Fail due Material Quantity Risk: Scrap Due to ECO')
                break
            elif i == 2:
                output.append('No Errors in Material Quantity')
                break
        i += 1
        l = u

    # Third random probability value (Material Quality)
    rand = random.random()
    l = 0
    u = 0
    i = 0
    probs = mqlt_risk[failure]
    p_noerror = probs[-1]
    for p in probs:
        u += p 
        if l < rand and rand <= u:
            if i == 0 or i == 1 or i == 2 or i == 3:
                failure = 1
            if i == 0:
                output.append('Fail due Material Quality Risk: Manufacturing Issue')
                break
            elif i == 1:
                output.append('Fail due Material Quality Risk: Design Issue')
                break
            elif i == 2:
                output.append('Fail due Material Quality Risk: Process Issue')
                break
            elif i == 3:
                output.append('Fail due Material Quality Risk: Training Issue')
                break
            elif i == 4:
                output.append('No Errors in Material Quality')
                break
        i += 1
        l = u

    print(output)

    


    
            

        



    
